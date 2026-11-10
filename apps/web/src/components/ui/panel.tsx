import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

/** Opaque content surface. Data lives on these, never on glass. */
export function Panel({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("rounded-card border border-stroke bg-surface", className)} {...props} />;
}

export function PanelHeader({
  title,
  description,
  action,
  id,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
  id?: string;
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2 border-b border-stroke px-4 py-3.5 sm:px-5">
      <div className="min-w-0">
        <h2 id={id} className="text-[15px] font-semibold text-ink">
          {title}
        </h2>
        {description ? <p className="mt-0.5 text-[13px] text-ink-2">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}
