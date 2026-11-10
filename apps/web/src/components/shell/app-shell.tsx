import { CommandPaletteProvider } from "./command-palette";
import { MobileDock } from "./mobile-dock";
import { Sidebar } from "./sidebar";
import { TopBar } from "./top-bar";

export function AppShell({ children }: { children: React.ReactNode }) {
  // The component reference is for people building the product; keep it out of production navigation.
  const showDesignReference = process.env.NODE_ENV !== "production";
  return (
    <CommandPaletteProvider showDesignReference={showDesignReference}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-60 focus:rounded-control focus:bg-accent focus:px-3 focus:py-2 focus:text-sm focus:font-medium focus:text-accent-ink"
      >
        Skip to content
      </a>
      <Sidebar showDesignReference={showDesignReference} />
      <div className="md:pl-[84px] lg:pl-[256px]">
        <TopBar />
        <main id="main" tabIndex={-1} className="mx-auto w-full max-w-[1180px] px-4 pt-8 pb-28 outline-none sm:px-6 md:pb-14 lg:px-10">
          {children}
        </main>
      </div>
      <MobileDock showDesignReference={showDesignReference} />
    </CommandPaletteProvider>
  );
}
