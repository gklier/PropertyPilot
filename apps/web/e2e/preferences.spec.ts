import { expect, test } from "./fixtures";

test.use({ viewport: { width: 1280, height: 800 } });

test("theme toggle switches theme and the choice survives a reload", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");
  const html = page.locator("html");
  await expect(html).toHaveAttribute("data-theme", "light");
  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  await expect(html).toHaveAttribute("data-theme", "dark");
  await page.reload();
  await expect(html).toHaveAttribute("data-theme", "dark");
  await expect(page.getByRole("button", { name: "Switch to light theme" })).toBeVisible();
});

test("system theme follows the device setting", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/settings");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(page.getByRole("radio", { name: "System" })).toBeChecked();
});

test("table density changes row height and survives a reload", async ({ page }) => {
  await page.goto("/design");
  const cell = page.getByRole("cell", { name: /Northgate Mechanical/ });
  const comfortable = (await cell.boundingBox())!.height;

  await page.goto("/settings");
  await page.getByRole("radio", { name: "Compact" }).check({ force: true });
  await expect(page.locator("html")).toHaveAttribute("data-density", "compact");

  await page.goto("/design");
  await expect(page.locator("html")).toHaveAttribute("data-density", "compact");
  const compact = (await cell.boundingBox())!.height;
  expect(compact).toBeLessThan(comfortable);
});

test("command palette opens from the keyboard, navigates, and changes theme", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");
  await page.keyboard.press("Control+k");
  const input = page.getByPlaceholder("Jump to a page or change a setting");
  await expect(input).toBeFocused();
  await input.fill("insurance");
  await page.keyboard.press("Enter");
  await expect(page.getByRole("heading", { level: 1, name: "Certificates" })).toBeVisible();

  await page.getByRole("button", { name: /Jump to/ }).click();
  await input.fill("dark");
  await page.keyboard.press("Enter");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
});

test("command palette says so when nothing matches and closes with Escape", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Control+k");
  await page.getByPlaceholder("Jump to a page or change a setting").fill("zzzz");
  await expect(page.getByText("Nothing matches.")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toBeHidden();
});

test("glass falls back to an opaque surface when transparency is reduced or colours are forced", async ({ page }) => {
  await page.goto("/");
  const bar = page.locator("header .glass");
  expect(await bar.evaluate((el) => getComputedStyle(el).backdropFilter)).toContain("blur");

  const cdp = await page.context().newCDPSession(page);
  await cdp.send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-transparency", value: "reduce" }] });
  expect(await bar.evaluate((el) => getComputedStyle(el).backdropFilter)).toBe("none");
  expect(await bar.evaluate((el) => getComputedStyle(el).backgroundColor)).toMatch(/^rgb\(/);

  await cdp.send("Emulation.setEmulatedMedia", { features: [] });
  await page.emulateMedia({ forcedColors: "active" });
  expect(await bar.evaluate((el) => getComputedStyle(el).backdropFilter)).toBe("none");
});

test("reduced motion removes animation time", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/design");
  await page.getByRole("button", { name: "Open sample dialog" }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  const seconds = await dialog.evaluate((el) => parseFloat(getComputedStyle(el).animationDuration));
  expect(seconds).toBeLessThan(0.001);
});
