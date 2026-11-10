import { describe, expect, it } from "vitest";
import { parseEnv } from "./env";

describe("parseEnv", () => {
  it("applies development defaults", () => {
    const env = parseEnv({});
    expect(env.NODE_ENV).toBe("development");
    expect(env.APP_URL).toBe("http://localhost:3000");
    expect(env.DATABASE_URL).toBeUndefined();
  });

  it("treats empty strings as unset", () => {
    expect(parseEnv({ DATABASE_URL: "" }).DATABASE_URL).toBeUndefined();
  });

  it("accepts a postgres connection string", () => {
    const url = "postgres://user:pass@localhost:5433/db";
    expect(parseEnv({ DATABASE_URL: url }).DATABASE_URL).toBe(url);
  });

  it("rejects a non-postgres connection string and names the variable", () => {
    expect(() => parseEnv({ DATABASE_URL: "mysql://localhost/db" })).toThrow(/DATABASE_URL/);
  });

  it("rejects an invalid APP_URL", () => {
    expect(() => parseEnv({ APP_URL: "not a url" })).toThrow(/APP_URL/);
  });

  it("requires a database in production", () => {
    expect(() => parseEnv({ NODE_ENV: "production" })).toThrow(/required in production/);
  });
});
