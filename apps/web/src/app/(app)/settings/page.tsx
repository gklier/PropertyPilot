import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { Panel, PanelHeader } from "@/components/ui/panel";
import { AppearanceSettings } from "./appearance";

export const metadata: Metadata = { title: "Settings" };

export default function SettingsPage() {
  return (
    <>
      <PageHeader title="Settings" description="Preferences for this browser." />
      <div className="flex max-w-[720px] flex-col gap-5">
        <Panel>
          <PanelHeader title="Appearance" description="Saved in this browser only." />
          <AppearanceSettings />
        </Panel>
        <Panel>
          <PanelHeader title="Organization" />
          <p className="px-4 py-4 text-ink-2 sm:px-5">
            Organization details, members and roles arrive with sign-in in milestone M1.
          </p>
        </Panel>
      </div>
    </>
  );
}
