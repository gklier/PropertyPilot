import { test as base, expect } from "@playwright/test";

/** Every test fails if the page logs a console error or throws. */
export const test = base.extend<{ consoleErrors: string[] }>({
  consoleErrors: [
    async ({ page }, use) => {
      const errors: string[] = [];
      page.on("console", (message) => {
        if (message.type() === "error") errors.push(message.text());
      });
      page.on("pageerror", (error) => errors.push(String(error)));
      await use(errors);
      expect(errors, "console errors").toEqual([]);
    },
    { auto: true },
  ],
});

export { expect };

export const routes = [
  { path: "/", heading: "Overview" },
  { path: "/vendors", heading: "Vendors" },
  { path: "/certificates", heading: "Certificates" },
  { path: "/review", heading: "Review queue" },
  { path: "/requirements", heading: "Requirements" },
  { path: "/properties", heading: "Properties" },
  { path: "/activity", heading: "Activity" },
  { path: "/settings", heading: "Settings" },
  { path: "/design", heading: "Design reference" },
];

export const widths = [320, 375, 768, 1024, 1440];
