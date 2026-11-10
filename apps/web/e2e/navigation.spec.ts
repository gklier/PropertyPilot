import { expect, routes, test } from "./fixtures";

test.describe("desktop navigation", () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test("every sidebar link opens its page and is marked current", async ({ page }) => {
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Primary" }).first();
    for (const route of routes.filter((r) => r.path !== "/design")) {
      await nav.getByRole("link", { name: route.heading, exact: true }).click();
      await expect(page).toHaveURL(new RegExp(`${route.path === "/" ? "/$" : route.path + "$"}`));
      await expect(page.getByRole("heading", { level: 1, name: route.heading })).toBeVisible();
      await expect(nav.getByRole("link", { name: route.heading, exact: true })).toHaveAttribute("aria-current", "page");
      await expect(page).toHaveTitle(new RegExp(route.heading));
    }
  });

  test("skip link moves focus to the main content", async ({ page }) => {
    await page.goto("/vendors");
    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page.locator("#main")).toBeFocused();
  });

  test("unknown addresses show the not-found page with a way back", async ({ page, consoleErrors }) => {
    const response = await page.goto("/no-such-page");
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("This page doesn’t exist");
    await page.getByRole("link", { name: "Go to overview" }).click();
    await expect(page.getByRole("heading", { level: 1, name: "Overview" })).toBeVisible();
    // The browser logs the 404 response itself; that is expected here.
    consoleErrors.length = 0;
  });
});

test.describe("phone navigation", () => {
  test.use({ viewport: { width: 375, height: 760 } });

  test("dock links work and More opens the remaining sections", async ({ page }) => {
    await page.goto("/");
    const dock = page.getByRole("navigation", { name: "Primary" }).last();
    await dock.getByRole("link", { name: "Vendors" }).click();
    await expect(page.getByRole("heading", { level: 1, name: "Vendors" })).toBeVisible();

    await dock.getByRole("button", { name: "More" }).click();
    const sheet = page.getByRole("dialog", { name: "More" });
    await expect(sheet).toBeVisible();
    await sheet.getByRole("link", { name: "Properties" }).click();
    await expect(page.getByRole("heading", { level: 1, name: "Properties" })).toBeVisible();
    await expect(sheet).toBeHidden();
  });

  test("More closes with Escape and returns focus to its button", async ({ page }) => {
    await page.goto("/");
    const more = page.getByRole("button", { name: "More" });
    await more.click();
    await expect(page.getByRole("dialog", { name: "More" })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog", { name: "More" })).toBeHidden();
    await expect(more).toBeFocused();
  });
});
