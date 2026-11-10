"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import { Ellipsis } from "lucide-react";
import { cn } from "@/lib/cn";
import { designItem, dockNav, dockOverflow, isActive } from "@/lib/nav";

const tab =
  "flex h-[52px] min-w-0 flex-1 flex-col items-center justify-center gap-0.5 rounded-[14px] text-[11px] font-medium tracking-[-0.01em] transition-colors duration-150";

export function MobileDock({ showDesignReference }: { showDesignReference: boolean }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const overflow = showDesignReference ? [...dockOverflow, designItem] : dockOverflow;
  const overflowActive = overflow.some((item) => isActive(pathname, item.href));

  return (
    <nav
      aria-label="Primary"
      className="glass fixed inset-x-3 bottom-[max(12px,env(safe-area-inset-bottom))] z-30 flex items-center gap-1 rounded-[20px] p-1.5 md:hidden"
    >
      {dockNav.map((item) => {
        const active = isActive(pathname, item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cn(tab, active ? "bg-accent-soft text-accent-text" : "text-ink-2")}
          >
            <item.icon aria-hidden className="size-5" strokeWidth={active ? 2.1 : 1.8} />
            <span className="max-w-full truncate">{item.short ?? item.label}</span>
          </Link>
        );
      })}

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger className={cn(tab, overflowActive ? "bg-accent-soft text-accent-text" : "text-ink-2")}>
          <Ellipsis aria-hidden className="size-5" />
          <span>More</span>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-(--overlay) data-[state=open]:animate-[fade-in_160ms_ease-out]" />
          <Dialog.Content
            className="fixed inset-x-0 bottom-0 z-60 rounded-t-[22px] border border-b-0 border-stroke bg-surface-raised px-3 pt-3 pb-[max(16px,env(safe-area-inset-bottom))] shadow-(--shadow-pop) data-[state=open]:animate-[sheet-in_260ms_var(--ease-out)]"
          >
            <div aria-hidden className="mx-auto mb-3 h-1 w-9 rounded-full bg-stroke-strong" />
            <Dialog.Title className="px-3 pb-2 text-[13px] font-medium text-ink-2">More</Dialog.Title>
            <Dialog.Description className="sr-only">Other sections of PropertyPilot</Dialog.Description>
            <ul className="flex flex-col gap-0.5">
              {overflow.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex h-12 items-center gap-3 rounded-[12px] px-3 text-[15px] font-medium",
                        active ? "bg-accent-soft text-accent-text" : "text-ink hover:bg-sunken",
                      )}
                    >
                      <item.icon aria-hidden className="size-5 text-current opacity-80" />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </nav>
  );
}
