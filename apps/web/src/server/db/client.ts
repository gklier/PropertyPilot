import "server-only";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { getEnv } from "@/server/env";
import * as schema from "./schema";

type Sql = ReturnType<typeof postgres>;

// One pool per server process; survives hot reloads in development.
const globalForDb = globalThis as unknown as { __ppSql?: Sql };

export function getSql(): Sql | null {
  const url = getEnv().DATABASE_URL;
  if (!url) return null;
  globalForDb.__ppSql ??= postgres(url, { max: 10, idle_timeout: 20, connect_timeout: 5 });
  return globalForDb.__ppSql;
}

export function getDb() {
  const sql = getSql();
  if (!sql) throw new Error("DATABASE_URL is not configured");
  return drizzle(sql, { schema });
}
