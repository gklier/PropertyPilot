import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { PlannedScreen } from "@/components/planned-screen";

export const metadata: Metadata = { title: "Requirements" };

export default function Page() {
  return (
    <PlannedScreen
      title="Requirements"
      description="The coverage you ask vendors to carry, by organization or by property."
      icon={ShieldCheck}
      emptyTitle="No requirements yet"
      milestone="milestone M2"
      willHold={[
        "Required policy types and minimum limits",
        "Rules that differ by property or by type of vendor",
        "Which requirements a person must judge by hand",
      ]}
    />
  );
}
