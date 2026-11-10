import { expect, test } from "./fixtures";

test.use({ viewport: { width: 1280, height: 900 } });

test.beforeEach(async ({ page }) => {
  await page.goto("/design");
});

test("form field reports an error, links it to the input, and clears it on a valid value", async ({ page }) => {
  const input = page.getByLabel("Vendor contact email");
  await page.getByRole("button", { name: "Check address" }).click();
  await expect(page.getByText("Enter an email address.")).toBeVisible();
  await expect(input).toHaveAttribute("aria-invalid", "true");
  await expect(input).toHaveAccessibleDescription(/Enter an email address/);

  await input.fill("ops-at-example");
  await page.getByRole("button", { name: "Check address" }).click();
  await expect(page.getByText(/doesn’t look like an email address/)).toBeVisible();

  await input.fill("ops@example.com");
  await page.getByRole("button", { name: "Check address" }).click();
  await expect(input).not.toHaveAttribute("aria-invalid", "true");
  await expect(page.getByText("Address format is valid")).toBeVisible();
});

test("table sorts by vendor and by date and reports the sort to assistive technology", async ({ page }) => {
  const firstVendor = page.locator("tbody tr").first().locator("td").first();
  await expect(firstVendor).toContainText("Brightline Janitorial");
  await page.getByRole("button", { name: "Vendor", exact: true }).click();
  await expect(firstVendor).toContainText("Summit Elevator Co.");
  await expect(page.getByRole("columnheader", { name: "Vendor" })).toHaveAttribute("aria-sort", "descending");

  await page.getByRole("button", { name: "Coverage ends" }).click();
  await expect(firstVendor).toContainText("Summit Elevator Co."); // earliest end date
  await expect(page.getByRole("columnheader", { name: "Coverage ends" })).toHaveAttribute("aria-sort", "ascending");
  await expect(page.getByRole("columnheader", { name: "Vendor" })).toHaveAttribute("aria-sort", "none");
});

test("dialog traps focus, closes with Escape, and returns focus to its trigger", async ({ page }) => {
  const trigger = page.getByRole("button", { name: "Open sample dialog" });
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "Request a corrected certificate?" });
  await expect(dialog).toBeVisible();
  for (let i = 0; i < 6; i++) {
    await page.keyboard.press("Tab");
    expect(await dialog.evaluate((el) => el.contains(document.activeElement))).toBe(true);
  }
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("dialog confirm closes it and shows a toast", async ({ page }) => {
  await page.getByRole("button", { name: "Open sample dialog" }).click();
  await page.getByRole("button", { name: "Request certificate" }).click();
  await expect(page.getByRole("dialog")).toBeHidden();
  await expect(page.getByText("Sample confirmed")).toBeVisible();
});
