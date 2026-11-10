"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { IconButton } from "@/components/ui/button";
import { useMounted } from "@/lib/preferences";
import { BrandMark, Wordmark } from "./brand";
import { useCommandPalette } from "./command-palette";
import { ThemeToggle } from "./theme-toggle";

export function TopBar() {
  const palette = useCommandPalette();
  const mounted = useMounted();
  const mac = mounted && /Mac|iPhone|iPad/.test(navigator.platform);
  return (
    <header className="sticky top-3 z-40 px-3 md:pr-3 md:pl-0">
      <div className="glass flex h-14 items-center gap-2 rounded-float pr-2.5 pl-3">
        <Link href="/" aria-label="PropertyPilot, go to overview" className="flex items-center gap-2.5 rounded-[10px] md:hidden">
          <BrandMark />
          <Wordmark className="max-[359px]:hidden" />
        </Link>

        <button
          type="button"
          onClick={palette.open}
          className="hidden h-9 w-[min(320px,40vw)] items-center gap-2.5 rounded-[10px] border border-ink/10 bg-surface/60 px-3 text-sm text-ink-2 transition-colors duration-150 hover:border-ink/20 hover:text-ink md:flex"
        >
          <Search aria-hidden className="size-4 shrink-0" />
          <span className="flex-1 text-left">Jump to…</span>
          <kbd className="rounded border border-ink/15 px-1.5 font-sans text-[12px] text-ink-2">
            {mac ? "⌘K" : "Ctrl K"}
          </kbd>
        </button>

        <div className="flex-1" />

        <IconButton label="Jump to a page or change a setting" onClick={palette.open} className="md:hidden">
          <Search aria-hidden />
        </IconButton>
        <ThemeToggle />
      </div>
    </header>
  );
}
