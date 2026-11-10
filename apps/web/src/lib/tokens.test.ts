import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { contrastRatio } from "./contrast";

const css = readFileSync(fileURLToPath(new URL("../app/globals.css", import.meta.url)), "utf8");

function block(selector: string): Record<string, string> {
  const start = css.indexOf(`${selector} {`);
  if (start < 0) throw new Error(`No ${selector} block`);
  const body = css.slice(start, css.indexOf("\n}", start));
  const out: Record<string, string> = {};
  for (const m of body.matchAll(/--([\w-]+):\s*(#[0-9a-f]{6})\s*;/gi)) out[m[1]!] = m[2]!;
  return out;
}

const themes = { light: block(":root"), dark: block('[data-theme="dark"]') };

// [foreground, background, minimum ratio]
const pairs: [string, string, number][] = [
  ["ink", "canvas", 7],
  ["ink", "surface", 7],
  ["ink-2", "canvas", 4.5],
  ["ink-2", "surface", 4.5],
  ["ink-2", "sunken", 4.5],
  ["ink-3", "canvas", 4.5],
  ["ink-3", "surface", 4.5],
  ["accent-ink", "accent", 4.5],
  ["accent-ink", "accent-hover", 4.5],
  ["accent-text", "surface", 4.5],
  ["accent-text", "canvas", 4.5],
  ["accent-text", "accent-soft", 4.5],
  ["ok", "ok-soft", 4.5],
  ["warn", "warn-soft", 4.5],
  ["danger", "danger-soft", 4.5],
  ["neutral", "neutral-soft", 4.5],
  ["ink", "glass-solid", 7],
  ["ink-2", "glass-solid", 4.5],
  // Non-text UI: control borders and focus ring need 3:1.
  ["stroke-strong", "surface", 1.4],
  ["focus", "surface", 3],
  ["focus", "canvas", 3],
];

describe.each(Object.entries(themes))("%s theme tokens", (_name, tokens) => {
  it.each(pairs)("%s on %s is at least %s:1", (fg, bg, min) => {
    const f = tokens[fg];
    const b = tokens[bg];
    expect(f, `--${fg} missing`).toBeDefined();
    expect(b, `--${bg} missing`).toBeDefined();
    expect(contrastRatio(f!, b!)).toBeGreaterThanOrEqual(min);
  });
});
