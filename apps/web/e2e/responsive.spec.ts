import { expect, routes, test, widths } from "./fixtures";

for (const width of widths) {
  test.describe(`at ${width}px`, () => {
    test.use({ viewport: { width, height: 800 } });

    test("no page scrolls sideways and the right navigation is shown", async ({ page }) => {
      for (const route of routes) {
        await page.goto(route.path);
        await expect(page.getByRole("heading", { level: 1, name: route.heading })).toBeVisible();
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
        );
        expect(overflow, `${route.path} horizontal overflow`).toBeLessThanOrEqual(0);
      }
      const sidebar = page.getByRole("navigation", { name: "Primary" }).first();
      const dock = page.getByRole("button", { name: "More" });
      if (width < 768) {
        await expect(dock).toBeVisible();
        await expect(sidebar.getByRole("link", { name: "Requirements" })).toBeHidden();
      } else {
        await expect(dock).toBeHidden();
        await expect(sidebar.getByRole("link", { name: "Requirements" })).toBeVisible();
      }
    });

    test("the sample table keeps every column reachable", async ({ page }) => {
      await page.goto("/design");
      const region = page.getByRole("region", { name: "Sample vendor table" });
      const lastHeader = page.getByRole("columnheader", { name: "Review state" });
      await lastHeader.scrollIntoViewIfNeeded();
      await expect(lastHeader).toBeInViewport();
      // On narrow screens the table scrolls inside its own region instead of clipping or stretching the page.
      if (width <= 768) expect(await region.evaluate((el) => el.scrollWidth > el.clientWidth)).toBe(true);
    });
  });
}
