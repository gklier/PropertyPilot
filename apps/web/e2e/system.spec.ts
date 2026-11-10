import { expect, test } from "./fixtures";

test("health endpoint reports a connected database and is not cached", async ({ request }) => {
  const response = await request.get("/api/health");
  expect(response.status()).toBe(200);
  expect(await response.json()).toEqual({ status: "ok", database: "connected" });
  expect(response.headers()["cache-control"]).toContain("no-store");
});

test("overview shows the live database state", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByTestId("status-database")).toContainText("Connected");
  await expect(page.getByTestId("status-email")).toContainText("Off");
});

test("responses carry baseline security headers", async ({ request }) => {
  const headers = (await request.get("/")).headers();
  expect(headers["x-content-type-options"]).toBe("nosniff");
  expect(headers["x-frame-options"]).toBe("DENY");
  expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
  expect(headers["x-powered-by"]).toBeUndefined();
});
