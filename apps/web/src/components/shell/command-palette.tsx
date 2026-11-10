"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Command } from "cmdk";
import { CornerDownLeft, Monitor, Moon, Rows3, Rows4, Search, Sun } from "lucide-react";
import { allNav, designItem } from "@/lib/nav";
import { setDensity } from "@/lib/preferences";

const PaletteContext = createContext<{ open: () => void } | null>(null);

export function useCommandPalette() {
  const ctx = useContext(PaletteContext);
  if (!ctx) throw new Error("useCommandPalette must be used inside CommandPaletteProvider");
  return ctx;
}

const itemClass =
  "flex h-10 cursor-pointer items-center gap-3 rounded-[10px] px-3 text-sm text-ink " +
  "data-[selected=true]:bg-accent-soft data-[selected=true]:text-accent-text [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-ink-2 " +
  "data-[selected=true]:[&_svg]:text-accent-text";

const groupClass =
  "[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:pb-1.5 " +
  "[&_[cmdk-group-heading]]:text-[12.5px] [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-ink-2";

export function CommandPaletteProvider({
  children,
  showDesignReference,
}: {
  children: React.ReactNode;
  showDesignReference: boolean;
}) {
  const [isOpen, setOpen] = useState(false);
  const router = useRouter();
  const { setTheme } = useTheme();

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const run = useCallback((action: () => void) => {
    setOpen(false);
    action();
  }, []);

  const value = useMemo(() => ({ open: () => setOpen(true) }), []);
  const destinations = showDesignReference ? [...allNav, designItem] : allNav;

  return (
    <PaletteContext.Provider value={value}>
      {children}
      <Command.Dialog
        open={isOpen}
        onOpenChange={setOpen}
        label="Jump to a page or change a setting"
        overlayClassName="fixed inset-0 z-50 bg-(--overlay) data-[state=open]:animate-[fade-in_140ms_ease-out]"
        contentClassName="glass glass-strong fixed top-[12vh] left-1/2 z-60 w-[min(560px,calc(100vw-24px))] -translate-x-1/2 overflow-hidden rounded-float data-[state=open]:animate-[fade-in_160ms_ease-out]"
      >
        <div className="flex items-center gap-3 border-b border-ink/10 px-4">
          <Search aria-hidden className="size-4 shrink-0 text-ink-2" />
          <Command.Input
            placeholder="Jump to a page or change a setting"
            className="h-12 w-full bg-transparent text-[15px] text-ink outline-none placeholder:text-ink-2"
          />
        </div>
        <Command.List className="max-h-[min(52vh,400px)] overflow-y-auto p-2">
          <Command.Empty className="px-3 py-8 text-center text-sm text-ink-2">
            Nothing matches. Try a page name, &ldquo;theme&rdquo; or &ldquo;density&rdquo;.
          </Command.Empty>
          <Command.Group heading="Go to" className={groupClass}>
            {destinations.map((item) => (
              <Command.Item
                key={item.href}
                value={item.label}
                keywords={item.keywords}
                onSelect={() => run(() => router.push(item.href))}
                className={itemClass}
              >
                <item.icon aria-hidden />
                {item.label}
              </Command.Item>
            ))}
          </Command.Group>
          <Command.Group heading="Appearance" className={groupClass}>
            <Command.Item value="Light theme" keywords={["appearance", "mode"]} onSelect={() => run(() => setTheme("light"))} className={itemClass}>
              <Sun aria-hidden />
              Use light theme
            </Command.Item>
            <Command.Item value="Dark theme" keywords={["appearance", "mode", "night"]} onSelect={() => run(() => setTheme("dark"))} className={itemClass}>
              <Moon aria-hidden />
              Use dark theme
            </Command.Item>
            <Command.Item value="System theme" keywords={["appearance", "mode", "auto"]} onSelect={() => run(() => setTheme("system"))} className={itemClass}>
              <Monitor aria-hidden />
              Match system theme
            </Command.Item>
            <Command.Item value="Comfortable density" keywords={["rows", "spacing", "tables"]} onSelect={() => run(() => setDensity("comfortable"))} className={itemClass}>
              <Rows3 aria-hidden />
              Use comfortable table density
            </Command.Item>
            <Command.Item value="Compact density" keywords={["rows", "spacing", "tables"]} onSelect={() => run(() => setDensity("compact"))} className={itemClass}>
              <Rows4 aria-hidden />
              Use compact table density
            </Command.Item>
          </Command.Group>
        </Command.List>
        <div className="flex items-center justify-end gap-1.5 border-t border-ink/10 px-4 py-2 text-[12.5px] text-ink-2">
          <CornerDownLeft aria-hidden className="size-3.5" />
          to select
          <kbd className="ml-3 rounded border border-ink/15 px-1 font-sans text-[11.5px]">Esc</kbd>
          to close
        </div>
      </Command.Dialog>
    </PaletteContext.Provider>
  );
}
