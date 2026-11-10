"use client";

import { useSyncExternalStore } from "react";

export type Density = "comfortable" | "compact";
const KEY = "pp-density";
const EVENT = "pp-density-change";

function read(): Density {
  try {
    return window.localStorage.getItem(KEY) === "compact" ? "compact" : "comfortable";
  } catch {
    return "comfortable";
  }
}

function subscribe(onChange: () => void) {
  window.addEventListener(EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

export function setDensity(value: Density) {
  try {
    window.localStorage.setItem(KEY, value);
  } catch {
    // Private browsing: the choice still applies to this page.
  }
  document.documentElement.dataset.density = value;
  window.dispatchEvent(new Event(EVENT));
}

export function useDensity(): Density {
  return useSyncExternalStore(subscribe, read, () => "comfortable");
}

const noop = () => () => {};

/** False during server render and hydration, true afterwards. */
export function useMounted(): boolean {
  return useSyncExternalStore(
    noop,
    () => true,
    () => false,
  );
}
