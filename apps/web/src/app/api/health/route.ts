import { NextResponse } from "next/server";
import { checkDatabase } from "@/server/health";

export const dynamic = "force-dynamic";

export async function GET() {
  const database = await checkDatabase();
  const ok = database.state === "connected";
  return NextResponse.json(
    { status: ok ? "ok" : "degraded", database: database.state },
    { status: ok ? 200 : 503, headers: { "Cache-Control": "no-store" } },
  );
}
