import { describe, expect, it } from "vitest";
import { allNav, dockNav, dockOverflow, isActive } from "./nav";

describe("navigation", () => {
  it("has unique destinations", () => {
    const hrefs = allNav.map((i) => i.href);
    expect(new Set(hrefs).size).toBe(hrefs.length);
  });

  it("reaches every destination from the phone dock or its overflow", () => {
    const reachable = new Set([...dockNav, ...dockOverflow].map((i) => i.href));
    for (const item of allNav) expect(reachable.has(item.href), item.href).toBe(true);
  });

  it("marks only the exact root as active for Overview", () => {
    expect(isActive("/", "/")).toBe(true);
    expect(isActive("/vendors", "/")).toBe(false);
  });

  it("marks nested paths active without matching lookalike prefixes", () => {
    expect(isActive("/vendors/123", "/vendors")).toBe(true);
    expect(isActive("/vendors-archive", "/vendors")).toBe(false);
  });
});
