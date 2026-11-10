"use client";

import { useMemo, useState } from "react";
import { Inbox, Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { EmptyState } from "@/components/ui/empty-state";
import { Field } from "@/components/ui/field";
import { Panel, PanelHeader } from "@/components/ui/panel";
import { Skeleton } from "@/components/ui/skeleton";
import { StatusChip, type Tone } from "@/components/ui/status-chip";
import { SortButton, Table, TableScroll, Td, Th, type SortDirection } from "@/components/ui/table";

type SampleRow = {
  vendor: string;
  service: string;
  property: string;
  policy: string;
  ends: string; // ISO date
  tone: Tone;
  state: string;
};

// Fictional companies, properties and policy numbers.
const sample: SampleRow[] = [
  { vendor: "Northgate Mechanical", service: "HVAC", property: "Alder Court Offices", policy: "GL-4471-2209", ends: "2027-03-31", tone: "ok", state: "Verified" },
  { vendor: "Brightline Janitorial", service: "Cleaning", property: "Alder Court Offices", policy: "GL-9038-1175", ends: "2026-12-14", tone: "warn", state: "Ends in 34 days" },
  { vendor: "Summit Elevator Co.", service: "Elevators", property: "Quarry Street Plaza", policy: "GL-2210-6643", ends: "2026-10-02", tone: "danger", state: "Expired" },
  { vendor: "Harbor Landscaping", service: "Grounds", property: "Millrace Business Park", policy: "GL-7754-0091", ends: "2027-06-30", tone: "neutral", state: "Not reviewed" },
  { vendor: "Ironwood Electric", service: "Electrical", property: "Quarry Street Plaza", policy: "GL-3306-4827", ends: "2027-01-19", tone: "pending", state: "Needs review" },
];

const dateFormat = new Intl.DateTimeFormat("en-US", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" });

const swatches = [
  "canvas", "surface", "sunken", "stroke", "stroke-strong", "ink", "ink-2", "ink-3",
  "accent", "accent-soft", "ok", "ok-soft", "warn", "warn-soft", "danger", "danger-soft",
];

function Section({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <Panel>
      <PanelHeader title={title} description={description} />
      {children}
    </Panel>
  );
}

function SampleTable() {
  const [sort, setSort] = useState<{ key: "vendor" | "ends"; direction: SortDirection }>({ key: "vendor", direction: "asc" });
  const rows = useMemo(() => {
    const sorted = [...sample].sort((a, b) => a[sort.key].localeCompare(b[sort.key]));
    return sort.direction === "asc" ? sorted : sorted.reverse();
  }, [sort]);
  const toggle = (key: "vendor" | "ends") =>
    setSort((s) => ({ key, direction: s.key === key && s.direction === "asc" ? "desc" : "asc" }));
  const ariaSort = (key: "vendor" | "ends") =>
    sort.key === key ? (sort.direction === "asc" ? "ascending" : "descending") : "none";

  return (
    <TableScroll label="Sample vendor table">
      <Table className="min-w-[760px]">
        <caption className="sr-only">Sample vendors, sortable by vendor name and coverage end date</caption>
        <thead>
          <tr>
            <Th aria-sort={ariaSort("vendor")}>
              <SortButton direction={sort.key === "vendor" ? sort.direction : null} onClick={() => toggle("vendor")}>
                Vendor
              </SortButton>
            </Th>
            <Th>Property</Th>
            <Th>Policy number</Th>
            <Th aria-sort={ariaSort("ends")} className="text-right">
              <SortButton direction={sort.key === "ends" ? sort.direction : null} onClick={() => toggle("ends")}>
                Coverage ends
              </SortButton>
            </Th>
            <Th>Review state</Th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.vendor} className="transition-colors duration-100 hover:bg-canvas/70">
              <Td>
                <span className="font-medium">{row.vendor}</span>
                <span className="ml-2 text-[13px] text-ink-2">{row.service}</span>
              </Td>
              <Td className="text-ink-2">{row.property}</Td>
              <Td>
                <span className="ident">{row.policy}</span>
              </Td>
              <Td className="tnum text-right whitespace-nowrap">{dateFormat.format(new Date(row.ends))}</Td>
              <Td>
                <StatusChip tone={row.tone}>{row.state}</StatusChip>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </TableScroll>
  );
}

function FormSample() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string>();
  return (
    <form
      noValidate
      className="flex max-w-[420px] flex-col gap-4 p-4 sm:p-5"
      onSubmit={(event) => {
        event.preventDefault();
        if (!email.trim()) return setError("Enter an email address.");
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return setError("That doesn’t look like an email address. Check for a missing @ or domain.");
        setError(undefined);
        toast.success("Address format is valid", { description: "This is a component sample. Nothing was saved." });
      }}
    >
      <Field
        label="Vendor contact email"
        type="email"
        autoComplete="off"
        placeholder="name@example.com"
        hint="Where requests for updated certificates would go."
        value={email}
        error={error}
        onChange={(event) => {
          setEmail(event.target.value);
          if (error) setError(undefined);
        }}
      />
      <div>
        <Button type="submit" variant="primary">
          Check address
        </Button>
      </div>
    </form>
  );
}

export function DesignReference() {
  const [dialogOpen, setDialogOpen] = useState(false);
  return (
    <div className="flex flex-col gap-5">
      <Section title="Type" description="One family. Titles are drawn narrower; numbers in tables are tabular; identifiers use the mono face.">
        <div className="flex flex-col gap-3 p-4 sm:p-5">
          <p className="title text-[34px]">Vendors and certificates</p>
          <p className="text-[17px] font-semibold">Section heading, 17 semibold</p>
          <p className="max-w-[62ch]">Body, 15 regular. Each vendor carries the coverage your requirements ask for, and a person on your team confirms what the certificate says before it counts.</p>
          <p className="text-[13px] text-ink-2">Supporting text, 13 regular, secondary ink.</p>
          <p>
            <span className="tnum">$1,000,000 / $2,000,000</span>
            <span className="ident ml-4">GL-4471-2209</span>
          </p>
        </div>
      </Section>

      <Section title="Colour" description="Contrast for every text and background pair is checked by an automated test.">
        <ul className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-4 sm:p-5 lg:grid-cols-8">
          {swatches.map((name) => (
            <li key={name} className="min-w-0">
              <span className="block h-11 rounded-control border border-stroke" style={{ background: `var(--${name})` }} />
              <span className="mt-1 block truncate text-[12.5px] text-ink-2">{name}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Buttons">
        <div className="flex flex-wrap items-center gap-3 p-4 sm:p-5">
          <Button variant="primary" onClick={() => toast("Primary button pressed")}>
            <Plus aria-hidden />
            Add vendor
          </Button>
          <Button onClick={() => toast("Secondary button pressed")}>Export list</Button>
          <Button variant="ghost" onClick={() => toast("Ghost button pressed")}>Clear filters</Button>
          <Button variant="danger" onClick={() => toast("Danger button pressed")}>Archive vendor</Button>
          <Button variant="primary" disabled>
            Disabled
          </Button>
        </div>
      </Section>

      <Section title="Review states" description="Colour is never the only signal: each state has an icon and a word.">
        <div className="flex flex-wrap gap-2.5 p-4 sm:p-5">
          <StatusChip tone="ok">Verified</StatusChip>
          <StatusChip tone="pending">Needs review</StatusChip>
          <StatusChip tone="warn">Ends in 34 days</StatusChip>
          <StatusChip tone="danger">Expired</StatusChip>
          <StatusChip tone="neutral">Not reviewed</StatusChip>
        </div>
      </Section>

      <Section title="Table" description="Sample data. Sort by vendor or date; switch density in Settings.">
        <SampleTable />
      </Section>

      <Section title="Form field" description="Errors say what is wrong and how to fix it, and are announced to screen readers.">
        <FormSample />
      </Section>

      <Section title="Dialog and toast">
        <div className="flex flex-wrap gap-3 p-4 sm:p-5">
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button>Open sample dialog</Button>
            </DialogTrigger>
            <DialogContent
              title="Request a corrected certificate?"
              description="This is a component sample. Confirming closes the dialog and sends nothing."
            >
              <div className="mt-6 flex justify-end gap-2.5">
                <DialogClose asChild>
                  <Button>Cancel</Button>
                </DialogClose>
                <Button
                  variant="primary"
                  onClick={() => {
                    setDialogOpen(false);
                    toast.success("Sample confirmed", { description: "Nothing was sent." });
                  }}
                >
                  Request certificate
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          <Button onClick={() => toast("Sample notification", { description: "Toasts confirm an action and then leave." })}>
            Show sample toast
          </Button>
        </div>
      </Section>

      <Section title="Glass" description="Used for floating navigation and overlays only. Content scrolls beneath it; data never sits on it.">
        <div className="relative h-44 overflow-hidden rounded-b-card">
          <div aria-hidden className="absolute inset-0 grid grid-cols-6 gap-2 p-3">
            {Array.from({ length: 24 }, (_, i) => (
              <span key={i} className={i % 5 === 0 ? "rounded-md bg-accent" : i % 3 === 0 ? "rounded-md bg-ink-3" : "rounded-md bg-stroke-strong"} />
            ))}
          </div>
          <div className="glass absolute inset-x-4 top-4 flex h-12 items-center rounded-float px-4 text-sm font-medium">
            Floating bar over content
          </div>
        </div>
      </Section>

      <div className="grid gap-5 md:grid-cols-2">
        <Section title="Empty state">
          <EmptyState icon={Inbox} title="No certificates waiting">
            <p>When a vendor sends a certificate, it appears here for review.</p>
          </EmptyState>
        </Section>
        <Section title="Loading">
          <div role="status" aria-label="Sample loading placeholder" className="flex flex-col gap-3 p-4 sm:p-5">
            <Skeleton className="h-5 w-2/5" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-3/5" />
          </div>
        </Section>
      </div>
    </div>
  );
}
