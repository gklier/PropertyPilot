import "server-only";
import { getSql } from "@/server/db/client";

export type DatabaseHealth =
  | { state: "connected"; latencyMs: number }
  | { state: "not_configured" }
  | { state: "unreachable" };

export async function checkDatabase(): Promise<DatabaseHealth> {
  const sql = getSql();
  if (!sql) return { state: "not_configured" };
  const started = performance.now();
  try {
    await sql`select 1`;
    return { state: "connected", latencyMs: Math.round(performance.now() - started) };
  } catch (error) {
    // The message can contain the connection string; log only the error class.
    console.error("Database health check failed:", error instanceof Error ? error.name : "unknown error");
    return { state: "unreachable" };
  }
}
