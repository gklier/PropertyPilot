import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { DesignReference } from "./reference";

export const metadata: Metadata = { title: "Design reference" };

export default function DesignPage() {
  return (
    <>
      <PageHeader
        title="Design reference"
        description="The components and tokens the product is built from. Everything on this page is sample content for reviewing components; none of it is workspace data."
      />
      <DesignReference />
    </>
  );
}
