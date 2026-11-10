"use client";

import { ThemeProvider, useTheme } from "next-themes";
import * as Tooltip from "@radix-ui/react-tooltip";
import { Toaster } from "sonner";

function ThemedToaster() {
  const { resolvedTheme } = useTheme();
  return (
    <Toaster
      theme={resolvedTheme === "dark" ? "dark" : "light"}
      position="bottom-right"
      offset={{ bottom: 24, right: 24 }}
      mobileOffset={{ bottom: 92, left: 12, right: 12 }}
      toastOptions={{
        style: {
          background: "var(--surface-raised)",
          color: "var(--ink)",
          border: "1px solid var(--stroke)",
          borderRadius: "12px",
          boxShadow: "var(--shadow-pop)",
          fontFamily: "var(--font-sans)",
          fontSize: "14px",
        },
      }}
    />
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem disableTransitionOnChange>
      <Tooltip.Provider delayDuration={250} skipDelayDuration={100}>
        {children}
      </Tooltip.Provider>
      <ThemedToaster />
    </ThemeProvider>
  );
}
