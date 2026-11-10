import type { LucideIcon } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHeader } from "@/components/ui/page-header";
import { Panel } from "@/components/ui/panel";
import { StatusChip } from "@/components/ui/status-chip";

/**
 * A screen whose data model has not been built yet. It says so plainly and
 * offers no controls, so nothing on the page pretends to work.
 */
export function PlannedScreen({
  title,
  description,
  icon,
  emptyTitle,
  willHold,
  milestone,
}: {
  title: string;
  description: string;
  icon: LucideIcon;
  emptyTitle: string;
  willHold: string[];
  milestone: string;
}) {
  return (
    <>
      <PageHeader title={title} description={description} />
      <Panel>
        <EmptyState icon={icon} title={emptyTitle}>
          <p>This screen is not built yet. When it is, it will hold:</p>
          <ul className="list-disc space-y-1 pl-5">
            {willHold.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          <p className="pt-2">
            <StatusChip tone="pending">Planned for {milestone}</StatusChip>
          </p>
        </EmptyState>
      </Panel>
    </>
  );
}
