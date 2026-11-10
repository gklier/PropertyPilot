import type { Metadata } from "next";
import { History } from "lucide-react";
import { PlannedScreen } from "@/components/planned-screen";

export const metadata: Metadata = { title: "Activity" };

export default function Page() {
  return (
    <PlannedScreen
      title="Activity"
      description="A record of who changed what, and when."
      icon={History}
      emptyTitle="No activity yet"
      milestone="milestone M1"
      willHold={[
        "Every sensitive change, with the person and the time",
        "Document uploads, reviews and requests sent to vendors",
        "Sign-ins and permission changes",
      ]}
    />
  );
}
