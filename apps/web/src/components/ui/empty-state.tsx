import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

export function EmptyState({
  icon: Icon,
  title,
  children,
  action,
  className,
}: {
  icon: LucideIcon;
  title: string;
  children?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col items-start gap-3 px-4 py-9 sm:px-5 sm:py-12", className)}>
      <span className="flex size-10 items-center justify-center rounded-[10px] border border-stroke bg-canvas text-ink-2">
        <Icon aria-hidden className="size-5" />
      </span>
      <div className="max-w-[58ch]">
        <h2 className="text-[17px] font-semibold text-ink">{title}</h2>
        {children ? <div className="mt-1.5 space-y-2 text-ink-2">{children}</div> : null}
      </div>
      {action}
    </div>
  );
}
