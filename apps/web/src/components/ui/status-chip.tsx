import { CircleAlert, CircleCheck, CircleDashed, Clock, TriangleAlert, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

export type Tone = "ok" | "warn" | "danger" | "neutral" | "pending";

const tones: Record<Tone, { className: string; icon: LucideIcon }> = {
  ok: { className: "bg-ok-soft text-ok", icon: CircleCheck },
  warn: { className: "bg-warn-soft text-warn", icon: TriangleAlert },
  danger: { className: "bg-danger-soft text-danger", icon: CircleAlert },
  neutral: { className: "bg-neutral-soft text-neutral", icon: CircleDashed },
  pending: { className: "bg-neutral-soft text-neutral", icon: Clock },
};

/** A state, always carried by an icon and a word as well as colour. */
export function StatusChip({ tone, children, className }: { tone: Tone; children: React.ReactNode; className?: string }) {
  const { className: toneClass, icon: Icon } = tones[tone];
  return (
    <span
      className={cn(
        "inline-flex h-6 items-center gap-1.5 rounded-md px-2 text-[13px] font-medium whitespace-nowrap",
        toneClass,
        className,
      )}
    >
      <Icon aria-hidden className="size-3.5 shrink-0" />
      {children}
    </span>
  );
}
