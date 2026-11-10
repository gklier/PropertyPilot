import Link from "next/link";
import { buttonClass } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-[520px] flex-col items-start justify-center gap-4 px-6">
      <h1 className="title text-[34px] text-ink">This page doesn&rsquo;t exist</h1>
      <p className="text-ink-2">The address may be mistyped, or the page may have moved.</p>
      <Link href="/" className={buttonClass("primary")}>
        Go to overview
      </Link>
    </main>
  );
}
