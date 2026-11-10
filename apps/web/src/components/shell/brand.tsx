import { cn } from "@/lib/cn";

/** Three buildings on a common baseline: a portfolio, drawn as plainly as possible. */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" aria-hidden className={cn("size-7 shrink-0", className)}>
      <rect width="28" height="28" rx="7" fill="var(--accent)" />
      <g fill="var(--accent-ink)">
        <rect x="6.5" y="13" width="4" height="8.5" rx="1" />
        <rect x="12" y="6.5" width="4" height="15" rx="1" />
        <rect x="17.5" y="10" width="4" height="11.5" rx="1" />
      </g>
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return <span className={cn("title text-[17px] text-ink", className)}>PropertyPilot</span>;
}
