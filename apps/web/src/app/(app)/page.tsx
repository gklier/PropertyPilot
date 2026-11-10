import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { Panel, PanelHeader } from "@/components/ui/panel";
import { StatusChip, type Tone } from "@/components/ui/status-chip";
import { checkDatabase, type DatabaseHealth } from "@/server/health";

export const metadata: Metadata = { title: "Overview" };
export const dynamic = "force-dynamic";

type StatusRow = { name: string; tone: Tone; state: string; detail: string };

function databaseRow(db: DatabaseHealth): StatusRow {
  switch (db.state) {
    case "connected":
      return {
        name: "Database",
        tone: "ok",
        state: "Connected",
        detail: `PostgreSQL answered in ${db.latencyMs} ms.`,
      };
    case "not_configured":
      return {
        name: "Database",
        tone: "neutral",
        state: "Not configured",
        detail: "Set DATABASE_URL to connect. See the README for the local database command.",
      };
    case "unreachable":
      return {
        name: "Database",
        tone: "danger",
        state: "Unreachable",
        detail: "The database did not answer. Check that it is running and that DATABASE_URL is correct.",
      };
  }
}

const milestones: { id: string; name: string; summary: string; current?: boolean }[] = [
  { id: "M0", name: "Foundation", summary: "App shell, design system, database connection, tests.", current: true },
  { id: "M1", name: "Sign-in and organizations", summary: "Accounts, roles, and the activity record." },
  { id: "M2", name: "Vendors and requirements", summary: "Properties, vendors, contacts, coverage requirements." },
  { id: "M3", name: "Certificates and review", summary: "Private uploads, field reading, the review queue." },
  { id: "M4", name: "Follow-up", summary: "Expiration queue, vendor upload links, reminder outbox." },
  { id: "M5", name: "Polish", summary: "Demonstration data, dashboard, accessibility and speed passes." },
];

export default async function OverviewPage() {
  const rows: StatusRow[] = [
    databaseRow(await checkDatabase()),
    { name: "Sign-in and organizations", tone: "pending", state: "Not built", detail: "Arrives in milestone M1. Until then this build has no accounts." },
    { name: "Document storage", tone: "pending", state: "Not built", detail: "Private storage arrives with certificate uploads in milestone M3." },
    { name: "Certificate reading", tone: "pending", state: "Not connected", detail: "The reading service is in the repository but is not wired to the app yet." },
    { name: "Email", tone: "neutral", state: "Off", detail: "No email is sent. Reminders will wait in an outbox until delivery is approved." },
  ];

  return (
    <>
      <PageHeader
        title="Overview"
        description="This is the foundation build. There are no accounts, vendors or certificates yet, so this page reports what is running instead."
      />

      <div className="grid gap-5 xl:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] xl:items-start">
        <Panel>
          <PanelHeader id="status-heading" title="System status" description="Checked when this page loaded." />
          <dl aria-labelledby="status-heading">
            {rows.map((row) => (
              <div
                key={row.name}
                data-testid={`status-${row.name.toLowerCase().replaceAll(" ", "-")}`}
                className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-1 border-b border-stroke px-4 py-3.5 last:border-b-0 sm:px-5"
              >
                <dt className="font-medium text-ink">{row.name}</dt>
                <dd className="justify-self-end">
                  <StatusChip tone={row.tone}>{row.state}</StatusChip>
                </dd>
                <dd className="col-span-2 text-[13.5px] text-ink-2">{row.detail}</dd>
              </div>
            ))}
          </dl>
        </Panel>

        <Panel>
          <PanelHeader id="sequence-heading" title="Build sequence" description="CertWatch is built in this order." />
          <ol aria-labelledby="sequence-heading">
            {milestones.map((m) => (
              <li key={m.id} className="flex gap-3.5 border-b border-stroke px-4 py-3 last:border-b-0 sm:px-5">
                <span className="tnum mt-px w-7 shrink-0 text-[13.5px] font-semibold text-ink-2">{m.id}</span>
                <div className="min-w-0 flex-1">
                  <p className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-medium text-ink">
                    {m.name}
                    {m.current ? <StatusChip tone="ok">This build</StatusChip> : null}
                  </p>
                  <p className="text-[13.5px] text-ink-2">{m.summary}</p>
                </div>
              </li>
            ))}
          </ol>
        </Panel>
      </div>
    </>
  );
}
