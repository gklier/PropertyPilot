"""Reading an ACORD 25 certificate of liability insurance.

The input is a list of words with positions on a 612 x 792 point page - from
the PDF's own text layer when it has one, from OCR when it is a scan. The form
is fixed, so every field is found from the printed label next to it rather
than from absolute coordinates: an agency's software or a scanner can shift the
page by a few points and the labels shift with it.

Two facts about the form carry most of the weight:
  - A limit's amount sits in the right-hand column, about 5pt ABOVE the top of
    its printed label ("EACH OCCURRENCE", "E.L. EACH ACCIDENT" ...).
  - The ADDL INSD and SUBR WVD boxes are columns under the printed "INSD" and
    "WVD" headers; an X or Y in that column, within a coverage's rows, ticks it.

Nothing here decides compliance. It reports what the certificate says and how
sure it is; the PropertyPilot app compares that with the property's requirements, and a
person approves or rejects.
"""
import re
from datetime import datetime

PAGE_W, PAGE_H = 612.0, 792.0

MONEY = re.compile(r"^\$?\d{1,3}(,\d{3})+$|^\$?\d{4,}$")
# 06/15/2026, 06-15-2026 and 06.15.2026 are all in use.
DATE = re.compile(r"^(\d{1,2})[/.-](\d{1,2})[/.-](\d{2}|\d{4})$")
EMAIL = re.compile(r"[\w.+-]+@[\w-]+(\.[\w-]+)+")
PHONE = re.compile(r"\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}")
TICK = {"X", "Y", "x", "y", "✓", "✔", "☒"}

STANDARD_CANCELLATION = ("should any of the above described policies be cancelled before the expiration date "
                         "thereof, notice will be delivered in accordance with the policy provisions")


def norm(text):
    return re.sub(r"[^a-z0-9&$/.,@ -]", "", text.lower())


class Page:
    def __init__(self, words):
        # words: dicts with x0, y0 (top), x1, y1 (bottom), text, conf (0-1)
        self.words = sorted(words, key=lambda w: (round(w["y0"]), w["x0"]))

    def find(self, phrase, region=None, after_y=None):
        """Box of the first place a label phrase is printed, or None.

        Matched on each line's letters with the spaces taken out, because OCR
        glues words ("GENLAGGREGATE", "SINGLELIMIT") and overlapping label glyphs
        split them; the first 80% of the phrase is enough, so a misread last
        letter or two does not lose the label."""
        target = re.sub(r"[^a-z0-9]", "", phrase.lower())
        probe = target[: max(5, int(len(target) * 0.8))] if len(target) > 5 else target
        ws = self.in_region(region) if region else self.words
        if after_y is not None:
            ws = [w for w in ws if w["y0"] >= after_y]
        for line in self._lines(ws):
            compact, owners, starts = "", [], set()
            for w in line:
                starts.add(len(compact))
                for ch in re.sub(r"[^a-z0-9]", "", w["text"].lower()):
                    compact += ch
                    owners.append(w)
            # A label starts a word and is printed in capitals, as every ACORD
            # label is: "R&R Insurance Services" is not the INSURED label.
            at = next((i for i in range(len(compact)) if compact.startswith(probe, i) and i in starts
                       and not re.search(r"[a-z]", owners[i]["text"])), -1)
            if at < 0:
                continue
            seq = owners[at : at + len(probe)]
            return {"x0": min(v["x0"] for v in seq), "y0": min(v["y0"] for v in seq),
                    "x1": max(v["x1"] for v in seq), "y1": max(v["y1"] for v in seq)}
        return None

    @staticmethod
    def _lines(ws):
        out = []
        for w in sorted(ws, key=lambda v: (v["y0"], v["x0"])):
            if out and abs(out[-1][0]["y0"] - w["y0"]) < 4:
                out[-1].append(w)
            else:
                out.append([w])
        return [sorted(line, key=lambda v: v["x0"]) for line in out]

    def in_region(self, region):
        x0, y0, x1, y1 = region
        return [w for w in self.words if w["x0"] >= x0 - 1 and w["x1"] <= x1 + 1 and w["y0"] >= y0 - 1 and w["y1"] <= y1 + 1]

    def lines(self, region, min_size=None):
        ws = [w for w in self.in_region(region) if min_size is None or w.get("size") is None or w["size"] >= min_size]
        out = []
        for w in ws:
            if out and abs(out[-1][0]["y0"] - w["y0"]) < 3.5:
                out[-1].append(w)
            else:
                out.append([w])
        return [(" ".join(v["text"] for v in sorted(line, key=lambda v: v["x0"])), min(v.get("conf", 1) for v in line)) for line in out]


def money(text):
    digits = re.sub(r"[^\d]", "", text)
    return int(digits) if digits else None


def iso(text):
    m = DATE.match(text.strip())
    if not m:
        return None
    month, day, year = int(m.group(1)), int(m.group(2)), int(m.group(3))
    if year < 100:
        year += 2000
    try:
        return datetime(year, month, day).date().isoformat()
    except ValueError:
        return None


# Limit labels: (key, label phrase) per coverage. The phrase is matched in the
# limits label column; the amount is the money word nearest 5pt above it.
LIMITS = {
    "gl": [("each_occurrence", "each occurrence"), ("damage_to_rented", "damage to rented"),
           ("med_exp", "med exp"), ("personal_adv", "personal & adv"),
           ("general_aggregate", "general aggregate"), ("products_aggregate", "products - comp/op")],
    # "single limit" too: agencies overprint "(Ea accident)" on this label and
    # the text layer interleaves the two, leaving "C (EO aM aB ccIN ...)SINGLE".
    "auto": [("combined_single", "combined single limit"), ("combined_single", "single limit")],
    "umbrella": [("each_occurrence", "each occurrence"), ("aggregate", "aggregate")],
    "wc": [("el_each_accident", "e.l. each accident"), ("el_disease_employee", "e.l. disease - ea"),
           ("el_disease_policy", "e.l. disease - policy")],
}
# Each section's title, then fallbacks for when OCR damages it.
SECTIONS = [("gl", ["commercial general liability", "general liability", "commercial general"]),
            ("auto", ["automobile liability", "automobile", "any auto"]),
            ("umbrella", ["umbrella liab", "umbrella", "excess liab"]),
            ("wc", ["workers compensation", "compensation", "employers liability"])]


def read(words, method):
    page = Page(words)
    out = {"form": None, "method": method, "fields": {}, "warnings": []}
    f = out["fields"]
    confs = []

    title = page.find("certificate of liability insurance")
    out["form"] = "ACORD 25" if title or page.find("acord 25") else None
    if not out["form"]:
        out["warnings"].append("This does not look like an ACORD 25 certificate.")

    # Anchors that split the page into its blocks.
    # Labels are looked for only where the form prints them - the left margin,
    # in their part of the page - because the legal paragraph at the top also
    # says "producer", "certificate holder" and "coverage".
    producer = page.find("producer", region=(10, 90, 80, 220)) or {"y0": 120}
    insured = page.find("insured", region=(10, producer["y0"] + 10, 80, 300)) or {"y0": 190}
    coverages = page.find("coverages", region=(10, insured["y0"] + 10, 100, 320)) or {"y0": 250}
    insd = page.find("insd", region=(150, coverages["y0"], 260, coverages["y0"] + 70))
    wvd = page.find("wvd", region=(150, coverages["y0"], 260, coverages["y0"] + 70))
    descr = page.find("description of operations", region=(10, coverages["y0"] + 150, 80, 720)) or {"y0": 575}
    if descr["y0"] < 540:  # the WC row's "describe under DESCRIPTION OF OPERATIONS below"
        descr = page.find("description of operations", region=(10, descr["y0"] + 20, 80, 720)) or descr
    holder = page.find("certificate holder", region=(10, descr["y0"] + 20, 120, PAGE_H)) or {"y0": 655}
    cancel = page.find("cancellation", region=(300, holder["y0"] - 5, PAGE_W, holder["y0"] + 15)) or {"y0": holder["y0"], "x0": 309}
    authorized = page.find("authorized representative", region=(300, holder["y0"], PAGE_W, PAGE_H)) or {"y0": 745}
    # The form's footer ("ACORD 25 (2016/03)") closes the holder box; the
    # AUTHORIZED REPRESENTATIVE label sits anywhere from mid-box down.
    footer = page.find("acord 25", region=(10, holder["y0"] + 20, 200, PAGE_H)) or {"y0": PAGE_H - 30}

    # Filled-in text is set larger than the form's own labels, but how much
    # larger is the agency's choice: most fill at 8-10pt, Aon at 7pt over 4.8pt
    # labels. Measured on this page from the labels' size where the PDF says it.
    label_sizes = sorted(w["size"] for w in page.words if w.get("size") and w["text"] in ("INSURED", "PRODUCER", "INSURER")
                         and w["x0"] < 340 and producer["y0"] - 5 <= w["y0"] <= coverages["y0"])
    fill = min(7.5, label_sizes[0] + 1.2) if method == "text" and label_sizes else 7.5

    # Certificate date: the date in the top-right box.
    date_words = [w for w in page.in_region((450, 20, PAGE_W, 110)) if iso(w["text"])]
    f["certificate_date"] = iso(date_words[0]["text"]) if date_words else None

    # The insured: the vendor. First line of filled-in text in the INSURED box.
    # From just above the label: some agencies set the name level with it. A
    # line that is only digits is the agency's own reference, not the insured.
    ins_lines = []
    for text, conf in page.lines((15, insured["y0"] - 1, 262, coverages["y0"] - 4), min_size=fill):
        text = re.sub(r"^insured\b[:\s]*", "", text, flags=re.I).strip()  # OCR keeps the label
        if text and not re.fullmatch(r"[\d\s-]+", text):
            ins_lines.append((text, conf))
    f["insured"] = {"name": ins_lines[0][0] if ins_lines else None, "address": [l[0] for l in ins_lines[1:4]]}
    confs += [l[1] for l in ins_lines[:1]]

    # Producer (the agency) and its contact: name, phone, email.
    prod_lines = page.lines((15, producer["y0"] + 4, 305, insured["y0"] - 2), min_size=fill)
    contact_text = " ".join(l[0] for l in page.lines((305, producer["y0"] - 4, PAGE_W, producer["y0"] + 55)))
    email = EMAIL.search(contact_text)
    phones = PHONE.findall(contact_text)
    name_line = page.lines((340, producer["y0"] - 4, PAGE_W, producer["y0"] + 10), min_size=fill)
    f["producer"] = {
        "agency": prod_lines[0][0] if prod_lines else None,
        "contact_name": re.sub(r"^(name|contact)[: ]+", "", name_line[0][0], flags=re.I).strip() if name_line else None,
        "phone": phones[0] if phones else None,
        "email": email.group(0) if email else None,
    }

    # Insurers A-F with NAIC numbers.
    insurers = {}
    for letter in "ABCDEF":
        a = page.find(f"insurer {letter.lower()}", region=(300, producer["y0"], PAGE_W, coverages["y0"]))
        if not a:
            continue
        line = page.lines((a["x1"] + 2, a["y0"] - 6, PAGE_W, a["y0"] + 6), min_size=fill)
        if line:
            text = re.sub(r"^:\s*", "", line[0][0]).strip()
            naic = re.search(r"(\d{5})\s*$", text)
            insurers[letter] = {"name": re.sub(r"\s*\d{5}\s*$", "", text).strip(), "naic": naic.group(1) if naic else None}
    f["insurers"] = insurers

    # Coverage sections: each runs from its label to the next one.
    def section(phrases):
        for phrase in phrases:
            hit = page.find(phrase, region=(30, coverages["y0"], 200, descr["y0"]))
            if hit:
                return hit
        return None
    found = [(key, section(phrases)) for key, phrases in SECTIONS]
    found = [(k, a) for k, a in found if a]
    found.sort(key=lambda kv: kv[1]["y0"])
    # Where the limit labels start. Usually ~428, but some agencies shift the
    # column left (Aon: 417); the labels are matched by phrase, so starting
    # left of the expiry dates costs nothing.
    limit_x = 395
    policies = {}
    for i, (key, anchor) in enumerate(found):
        top = anchor["y0"] - 8
        bottom = (found[i + 1][1]["y0"] - 8) if i + 1 < len(found) else descr["y0"] - 2
        band = (0, top, PAGE_W, bottom)
        ws = page.in_region(band)
        pol = {"policy_number": None, "effective": None, "expires": None, "additional_insured": False,
               "subrogation_waived": False, "limits": {}, "insurer": None}
        # Insurer letter: a lone capital in the INSR LTR column.
        ltr = [w for w in ws if w["x1"] < 36 and re.fullmatch(r"[A-F]", w["text"])]
        if ltr:
            pol["insurer"] = ltr[0]["text"]
        # Dates in the policy columns, effective then expiry.
        dates = sorted([w for w in ws if 320 < w["x0"] < 425 and iso(w["text"])], key=lambda w: (round(w["y0"] / 4), w["x0"]))
        if dates:
            pol["effective"] = iso(dates[0]["text"])
            pol["expires"] = iso(dates[1]["text"]) if len(dates) > 1 else None
            confs += [d.get("conf", 1) for d in dates[:2]]
        nums = [w for w in ws if 205 < w["x0"] < 330 and re.fullmatch(r"[A-Z0-9][A-Z0-9-]{4,}", w["text"]) and not iso(w["text"])]
        if nums:
            pol["policy_number"] = nums[0]["text"]
        # The two tick columns.
        for col, field in ((insd, "additional_insured"), (wvd, "subrogation_waived")):
            if col:
                cx0, cx1 = col["x0"] - 5, col["x1"] + 5
                pol[field] = any(w["text"].strip() in TICK and w["x0"] >= cx0 and w["x1"] <= cx1 for w in ws)
        # Limits: the amount in this coverage's rows nearest its label - usually
        # ~5pt above it in agency PDFs, level with or just below it on scans and
        # on two-line labels such as COMBINED SINGLE LIMIT (Ea accident).
        amounts = [w for w in ws if w["x0"] > 500 and MONEY.match(w["text"].replace(" ", ""))]
        # Each amount belongs to one label: pair them closest-first, so a
        # two-line label (DAMAGE TO RENTED / PREMISES) cannot borrow the amount
        # of the label above it.
        pairs = []
        for lk, phrase in LIMITS[key]:
            lab = page.find(phrase, region=(limit_x, top, 520, bottom))
            if not lab:
                continue
            for a in amounts:
                dy = a["y0"] - lab["y0"]
                if -9 <= dy <= 6:
                    pairs.append((abs(dy + 3), lk, id(a), a))
        taken_labels, taken_amounts = set(), set()
        for _, lk, aid, a in sorted(pairs, key=lambda p: p[0]):
            if lk in taken_labels or aid in taken_amounts:
                continue
            taken_labels.add(lk)
            taken_amounts.add(aid)
            pol["limits"][lk] = money(a["text"])
            confs.append(a.get("conf", 1))
        # Umbrella's "AGGREGATE" also matches "GENERAL AGGREGATE" text elsewhere; it
        # is scoped to the band, so only the umbrella's own label is found here.
        if key == "wc":
            pol["statutory"] = any(norm(w["text"]).startswith("statute") for w in ws) and any(
                w["text"] in TICK and 425 < w["x0"] < 445 for w in ws)
        # A coverage row printed on the form but left blank (no policy number,
        # no dates, no limits) is a coverage the vendor does not carry.
        if not pol["policy_number"] and not pol["effective"] and not pol["expires"] and not pol["limits"]:
            continue
        policies[key] = pol
    f["policies"] = policies

    # Description of operations: where additional insureds are named.
    desc_lines = page.lines((10, descr["y0"] + 4, PAGE_W, holder["y0"] - 2), min_size=7)
    f["description"] = " ".join(l[0] for l in desc_lines).strip()

    # Certificate holder: the box under its label, left half.
    hold_lines = page.lines((15, holder["y0"] + 8, 305, footer["y0"] - 1), min_size=fill)
    f["certificate_holder"] = [l[0] for l in hold_lines
                               if not re.search(r"acord|authorized|@", l[0], re.I) and not re.fullmatch(r"[\d\s-]+", l[0])]

    # Cancellation wording, and whether it is the form's standard sentence.
    canc = " ".join(l[0] for l in page.lines((cancel["x0"] - 2, cancel["y0"] + 8, PAGE_W, authorized["y0"] - 1)))
    # Standard if it is the form's sentence give or take a few words the text
    # layer lost (Aon draws SHOULD / EXPIRATION / POLICY as graphics), and
    # adds nothing that changes it - a notice period in days is a change.
    std = set(norm(STANDARD_CANCELLATION).replace(",", "").split())
    got = set(norm(canc).replace(",", "").replace(".", "").split())
    f["cancellation"] = {"text": canc.strip(),
                         "standard": len(std - got) <= 3 and not re.search(r"\d+\s*days?", canc, re.I)}

    if not policies:
        out["warnings"].append("No coverage rows were found.")
    out["confidence"] = round(min(confs), 2) if confs else 0.0
    return out
