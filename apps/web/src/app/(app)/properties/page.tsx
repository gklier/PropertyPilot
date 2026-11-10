import type { Metadata } from "next";
import { Building2 } from "lucide-react";
import { PlannedScreen } from "@/components/planned-screen";

export const metadata: Metadata = { title: "Properties" };

export default function Page() {
  return (
    <PlannedScreen
      title="Properties"
      description="The buildings and sites in your portfolio."
      icon={Building2}
      emptyTitle="No properties yet"
      milestone="milestone M2"
      willHold={[
        "Each property, optionally grouped into portfolios",
        "The vendors assigned to each property",
        "The coverage requirements that apply there",
      ]}
    />
  );
}
