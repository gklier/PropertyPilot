"""Words with positions from a certificate PDF, cheapest route first.

1. The PDF's own text layer (most agency-generated certificates have one):
   exact text, exact positions, no guessing, milliseconds.
2. OCR with docTR, on this machine, for scans. Slower (seconds per page on
   the CPU) and reported with per-word confidence, so the comparison sheet can
   ask a person to check what the OCR was unsure of.

A local vision model (Ollama) could be a third rung for certificates neither
route reads; on this server's CPU it is minutes per page, so it is not wired.
"""
import io
import re
import pdfplumber
import pypdfium2 as pdfium

import acord25

_ocr = None


def _predictor():
    global _ocr
    if _ocr is None:
        from doctr.models import ocr_predictor
        _ocr = ocr_predictor(det_arch="db_resnet50", reco_arch="crnn_vgg16_bn", pretrained=True)
    return _ocr


def _is_acord(text):
    t = text.upper()
    return "CERTIFICATE OF LIABILITY" in t or "ACORD 25" in t


def text_layer(data):
    """(page index, words) for the ACORD 25 page, or None when there is no text."""
    with pdfplumber.open(io.BytesIO(data)) as pdf:
        for i, page in enumerate(pdf.pages[:12]):
            # A tight tolerance: some agency software writes no space characters,
            # only gaps, and the default glues "Example Landscaping, LLC" together.
            words = page.extract_words(x_tolerance=1.2, extra_attrs=["size", "upright"])
            # Sideways text (a holder ID printed up the margin) and barcode
            # fonts (one "word" of 200 digits) are not part of the form.
            words = [w for w in words if w.get("upright", True) and not re.fullmatch(r"\d{20,}", w["text"])]
            if not words:
                continue
            text = " ".join(w["text"] for w in words)
            if not _is_acord(text):
                continue
            sx, sy = acord25.PAGE_W / float(page.width), acord25.PAGE_H / float(page.height)
            out = [{"x0": w["x0"] * sx, "y0": w["top"] * sy, "x1": w["x1"] * sx, "y1": w["bottom"] * sy,
                    "text": w["text"], "size": w["size"] * sy, "conf": 1.0} for w in words]
            return i, out + [{**m, "x0": m["x0"] * sx, "x1": m["x1"] * sx, "y0": m["y0"] * sy, "y1": m["y1"] * sy}
                             for m in drawn_ticks(page)]
    return None


def drawn_ticks(page):
    """Checkbox marks drawn as two crossing strokes rather than typed as "X".

    Many agency systems draw the ✕ in the ADDL INSD / SUBR WVD boxes as a pair
    of diagonal lines; the text layer then has no X at all. Each pair whose
    boxes overlap becomes a synthetic "X" word where the mark is."""
    strokes = [l for l in list(page.lines) + list(page.curves)
               if abs(l["x1"] - l["x0"]) > 3 and abs(l["bottom"] - l["top"]) > 3
               and abs(l["x1"] - l["x0"]) < 40 and abs(l["bottom"] - l["top"]) < 40]
    marks = []
    for s in strokes:
        box = (s["x0"], s["top"], s["x1"], s["bottom"])
        if any(abs(box[0] - m["x0"]) < 2 and abs(box[1] - m["y0"]) < 2 for m in marks):
            continue  # the second stroke of a mark already found
        partner = any(o is not s and o["x0"] < box[2] and o["x1"] > box[0] and o["top"] < box[3] and o["bottom"] > box[1]
                      for o in strokes)
        if partner:
            marks.append({"x0": box[0], "y0": box[1], "x1": box[2], "y1": box[3], "text": "X", "size": 9.0, "conf": 1.0})
    return marks


def ocr(data, max_pages=4):
    pdf = pdfium.PdfDocument(data)
    predictor = _predictor()
    best = None
    for i in range(min(len(pdf), max_pages)):
        image = pdf[i].render(scale=300 / 72).to_numpy()
        result = predictor([image])
        words = []
        for block in result.pages[0].blocks:
            for line in block.lines:
                for w in line.words:
                    (x0, y0), (x1, y1) = w.geometry
                    h = (y1 - y0) * acord25.PAGE_H
                    words.append({"x0": x0 * acord25.PAGE_W, "y0": y0 * acord25.PAGE_H, "x1": x1 * acord25.PAGE_W,
                                  "y1": y1 * acord25.PAGE_H, "text": w.value, "conf": float(w.confidence),
                                  # Filled-in text is set larger than the form's labels; OCR has no font
                                  # size, so the box height stands in for it.
                                  "size": h * 1.05})
        if _is_acord(" ".join(w["text"] for w in words)):
            return i, words
        best = best or (i, words)
    return best


CONTINUATION = re.compile(r"ADDITIONAL REMARKS SCHEDULE|CONTINUATION\s+DESCRIPTION OF OPERATIONS", re.I)


def remarks(data, after, max_pages=12):
    """Text of the remarks pages that follow the certificate.

    "*** see page 2 ***", "See Attached" - the description of operations, where
    the additional insureds are named, often runs onto an ACORD 101 Additional
    Remarks Schedule or the agency's own continuation sheet. Only those pages:
    endorsements and named-insured lists after them are not the description."""
    out = []
    with pdfplumber.open(io.BytesIO(data)) as pdf:
        for page in pdf.pages[after + 1 : after + 1 + max_pages]:
            text = page.extract_text(x_tolerance=1.2) or ""
            if not CONTINUATION.search(text):
                continue
            lines = text.splitlines()
            # The body starts after the sheet's own heading block.
            start = 0
            for i, line in enumerate(lines):
                if re.search(r"FORM TITLE:|\(Use only if more space is required\)|^ADDITIONAL REMARKS$", line, re.I):
                    start = i + 1
            body = [l for l in lines[start:] if not re.search(r"^ACORD \d+ \(|ACORD CORPORATION|registered marks of ACORD", l)]
            if body:
                out.append(" ".join(body).strip())
    return " ".join(out)


def read_pdf(data):
    found = text_layer(data)
    if found:
        page, words = found
        result = acord25.read(words, "text")
    else:
        page, words = ocr(data)
        result = acord25.read(words, "ocr")
    result["page"] = page + 1
    extra = remarks(data, page)
    if extra:
        f = result["fields"]
        f["description"] = f"{f.get('description') or ''} {extra}".strip()
        result["remarks_pages"] = True
    return result
