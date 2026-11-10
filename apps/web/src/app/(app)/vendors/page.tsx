import type { Metadata } from "next";
import { HardHat } from "lucide-react";
import { PlannedScreen } from "@/components/planned-screen";

export const metadata: Metadata = { title: "Vendors" };

export default function Page() {
  return (
    <PlannedScreen
      title="Vendors"
      description="The companies that work on your properties, and whether their insurance paperwork is in order."
      icon={HardHat}
      emptyTitle="No vendors yet"
      milestone="milestone M2"
      willHold={[
        "Each vendor with its contacts and service categories",
        "The properties each vendor is assigned to",
        "The state of each vendor's insurance documents, as reviewed by your team",
      ]}
    />
  );
}
