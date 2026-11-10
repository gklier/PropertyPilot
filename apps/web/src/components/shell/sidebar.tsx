"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as Tooltip from "@radix-ui/react-tooltip";
import { cn } from "@/lib/cn";
import { designItem, isActive, navGroups, settingsItem, type NavItem } from "@/lib/nav";
import { BrandMark, Wordmark } from "./brand";

function RailLink({ item, pathname }: { item: NavItem; pathname: string }) {
  const active = isActive(pathname, item.href);
  const Icon = item.icon;
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <Link
          href={item.href}
          aria-current={active ? "page" : undefined}
          className={cn(
            "group flex h-9 items-center gap-3 rounded-[10px] px-2.5 text-sm font-medium transition-colors duration-150",
            "justify-center lg:justify-start",
            active ? "bg-accent-soft text-accent-text" : "text-ink-2 hover:bg-ink/[0.06] hover:text-ink",
          )}
        >
          <Icon aria-hidden className="size-[18px] shrink-0" strokeWidth={active ? 2.1 : 1.8} />
          <span className="sr-only lg:not-sr-only">{item.label}</span>
        </Link>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        {/* Labels are visible at desktop width, so the tooltip is only for the icon rail. */}
        <Tooltip.Content
          side="right"
          sideOffset={10}
          className="z-60 rounded-md bg-ink px-2 py-1 text-[13px] font-medium text-canvas lg:hidden"
        >
          {item.label}
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}

export function Sidebar({ showDesignReference }: { showDesignReference: boolean }) {
  const pathname = usePathname();
  return (
    <nav
      aria-label="Primary"
      className="glass fixed top-3 bottom-3 left-3 z-40 hidden w-[60px] flex-col rounded-float p-2.5 md:flex lg:w-[232px] lg:p-3"
    >
      <Link
        href="/"
        aria-label="PropertyPilot, go to overview"
        className="mb-4 flex h-10 items-center justify-center gap-2.5 rounded-[10px] lg:justify-start lg:px-1.5"
      >
        <BrandMark />
        <Wordmark className="hidden lg:inline" />
      </Link>

      <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto">
        {navGroups.map((group) => (
          <div key={group.id} role="group" aria-label={group.label ?? "Home"}>
            {group.label ? (
              <>
                <p aria-hidden className="mb-1 hidden px-2.5 text-[12.5px] font-medium text-ink-3 lg:block">
                  {group.label}
                </p>
                <div aria-hidden className="mx-2 mb-2 border-t border-ink/10 lg:hidden" />
              </>
            ) : null}
            <ul className="flex flex-col gap-0.5">
              {group.items.map((item) => (
                <li key={item.href}>
                  <RailLink item={item} pathname={pathname} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <ul className="mt-3 flex flex-col gap-0.5 border-t border-ink/10 pt-3">
        {showDesignReference ? (
          <li>
            <RailLink item={designItem} pathname={pathname} />
          </li>
        ) : null}
        <li>
          <RailLink item={settingsItem} pathname={pathname} />
        </li>
      </ul>
    </nav>
  );
}
