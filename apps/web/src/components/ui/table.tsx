import type { HTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from "react";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/cn";

/** Scrolls sideways on narrow screens instead of clipping columns. */
export function TableScroll({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div role="region" aria-label={label} tabIndex={0} className="overflow-x-auto">
      {children}
    </div>
  );
}

export function Table({ className, ...props }: HTMLAttributes<HTMLTableElement>) {
  return <table className={cn("w-full border-collapse text-left text-sm", className)} {...props} />;
}

export function Th({ className, ...props }: ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      scope="col"
      className={cn(
        "h-10 border-b border-stroke bg-canvas/60 px-4 text-[13px] font-medium whitespace-nowrap text-ink-2 first:pl-5 last:pr-5",
        className,
      )}
      {...props}
    />
  );
}

export function Td({ className, ...props }: TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td
      className={cn(
        "h-(--row-h) border-b border-stroke px-4 py-(--cell-py) align-middle text-ink first:pl-5 last:pr-5",
        className,
      )}
      {...props}
    />
  );
}

export type SortDirection = "asc" | "desc";

export function SortButton({
  children,
  direction,
  onClick,
}: {
  children: React.ReactNode;
  direction: SortDirection | null;
  onClick: () => void;
}) {
  const Icon = direction === "asc" ? ArrowUp : direction === "desc" ? ArrowDown : ArrowUpDown;
  return (
    <button
      type="button"
      onClick={onClick}
      className="-mx-1.5 inline-flex h-7 items-center gap-1.5 rounded-md px-1.5 font-medium hover:bg-sunken hover:text-ink"
    >
      {children}
      <Icon aria-hidden className={cn("size-3.5", direction ? "text-ink" : "text-ink-3")} />
    </button>
  );
}
