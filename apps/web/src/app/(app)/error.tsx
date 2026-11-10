"use client";

import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";

export default function AppError({ reset }: { error: Error; reset: () => void }) {
  return (
    <>
      <PageHeader title="This page couldn’t load" description="Something failed on our side while preparing it. Your data has not changed." />
      <Button variant="primary" onClick={reset}>
        Try again
      </Button>
    </>
  );
}
