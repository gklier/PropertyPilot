"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Segmented } from "@/components/ui/segmented";
import { setDensity, useDensity, useMounted, type Density } from "@/lib/preferences";

type ThemeChoice = "light" | "dark" | "system";

export function AppearanceSettings() {
  const { theme, setTheme } = useTheme();
  const density = useDensity();
  const mounted = useMounted();
  return (
    <div className="divide-y divide-stroke">
      <Segmented<ThemeChoice>
        legend="Theme"
        hint="System follows your device setting."
        value={mounted ? (theme as ThemeChoice) : undefined}
        onChange={setTheme}
        options={[
          { value: "light", label: "Light", icon: Sun },
          { value: "dark", label: "Dark", icon: Moon },
          { value: "system", label: "System", icon: Monitor },
        ]}
      />
      <Segmented<Density>
        legend="Table density"
        hint="Compact fits more rows on screen."
        value={mounted ? density : undefined}
        onChange={setDensity}
        options={[
          { value: "comfortable", label: "Comfortable" },
          { value: "compact", label: "Compact" },
        ]}
      />
    </div>
  );
}
