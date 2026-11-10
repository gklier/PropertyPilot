import type { Metadata } from "next";
import { FileCheck } from "lucide-react";
import { PlannedScreen } from "@/components/planned-screen";

export const metadata: Metadata = { title: "Certificates" };

export default function Page() {
  return (
    <PlannedScreen
      title="Certificates"
      description="Every certificate of insurance your team has received, with its history."
      icon={FileCheck}
      emptyTitle="No certificates yet"
      milestone="milestone M3"
      willHold={[
        "Uploaded certificate PDFs, stored privately",
        "Carrier, policy numbers, limits and dates read from each document",
        "Earlier versions of each certificate and who reviewed them",
      ]}
    />
  );
}
