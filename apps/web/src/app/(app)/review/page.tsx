import type { Metadata } from "next";
import { ListChecks } from "lucide-react";
import { PlannedScreen } from "@/components/planned-screen";

export const metadata: Metadata = { title: "Review queue" };

export default function Page() {
  return (
    <PlannedScreen
      title="Review queue"
      description="Certificates waiting for a person to check what was read from them."
      icon={ListChecks}
      emptyTitle="Nothing to review"
      milestone="milestone M3"
      willHold={[
        "Certificates whose extracted fields have not been checked by a person",
        "Each field beside the place in the document it was read from",
        "A confidence level for every extracted value",
      ]}
    />
  );
}
