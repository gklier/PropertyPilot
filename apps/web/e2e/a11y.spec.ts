import AxeBuilder from "@axe-core/playwright";
import { expect, routes, test } from "./fixtures";

const tags = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

for (const scheme of ["light", "dark"] as const) {
  for (const viewport of [
    { width: 1280, height: 800 },
    { width: 375, height: 760 },
  ]) {
    test(`no automated accessibility violations (${scheme}, ${viewport.width}px)`, async ({ page }) => {
      await page.setViewportSize(viewport);
      await page.emulateMedia({ colorScheme: scheme, reducedMotion: "reduce" });
      for (const route of routes) {
        await page.goto(route.path);
        await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
        const results = await new AxeBuilder({ page }).withTags(tags).analyze();
        const summary = results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`);
        expect(summary, `${route.path} (${scheme})`).toEqual([]);
      }
    });
  }
}

test("open dialog and command palette have no automated violations", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/design");
  await page.getByRole("button", { name: "Open sample dialog" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  expect((await new AxeBuilder({ page }).withTags(tags).analyze()).violations.map((v) => v.id)).toEqual([]);
  await page.keyboard.press("Escape");
  await page.keyboard.press("Control+k");
  await expect(page.getByPlaceholder("Jump to a page or change a setting")).toBeVisible();
  expect((await new AxeBuilder({ page }).withTags(tags).analyze()).violations.map((v) => v.id)).toEqual([]);
});
