import {
  Building2,
  FileCheck,
  HardHat,
  History,
  LayoutDashboard,
  ListChecks,
  Palette,
  Settings2,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  href: string;
  label: string;
  /** Short label for the phone dock. */
  short?: string;
  icon: LucideIcon;
  /** Extra words the command palette should match. */
  keywords?: string[];
};

export type NavGroup = { id: string; label?: string; items: NavItem[] };

export const navGroups: NavGroup[] = [
  {
    id: "home",
    items: [{ href: "/", label: "Overview", icon: LayoutDashboard, keywords: ["home", "status", "dashboard"] }],
  },
  {
    id: "certwatch",
    label: "CertWatch",
    items: [
      { href: "/vendors", label: "Vendors", icon: HardHat, keywords: ["contractors", "suppliers"] },
      {
        href: "/certificates",
        label: "Certificates",
        short: "Certs",
        icon: FileCheck,
        keywords: ["coi", "insurance", "documents", "acord"],
      },
      { href: "/review", label: "Review queue", short: "Review", icon: ListChecks, keywords: ["verify", "extraction"] },
      { href: "/requirements", label: "Requirements", icon: ShieldCheck, keywords: ["coverage", "limits", "rules"] },
    ],
  },
  {
    id: "portfolio",
    label: "Portfolio",
    items: [
      { href: "/properties", label: "Properties", icon: Building2, keywords: ["buildings", "sites", "locations"] },
      { href: "/activity", label: "Activity", icon: History, keywords: ["audit", "log", "history", "timeline"] },
    ],
  },
];

export const settingsItem: NavItem = {
  href: "/settings",
  label: "Settings",
  icon: Settings2,
  keywords: ["appearance", "theme", "density", "preferences"],
};

/** Component reference for people building the product. Not linked in production navigation. */
export const designItem: NavItem = {
  href: "/design",
  label: "Design reference",
  icon: Palette,
  keywords: ["components", "tokens", "styleguide"],
};

export const primaryNav: NavItem[] = navGroups.flatMap((g) => g.items);
export const allNav: NavItem[] = [...primaryNav, settingsItem];

/** First four destinations sit in the phone dock; the rest open from "More". */
export const dockNav: NavItem[] = primaryNav.slice(0, 4);
export const dockOverflow: NavItem[] = [...primaryNav.slice(4), settingsItem];

export function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
