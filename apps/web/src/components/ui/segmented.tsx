"use client";

import { useId } from "react";
import type { LucideIcon } from "lucide-react";

export type SegmentOption<T extends string> = { value: T; label: string; icon?: LucideIcon };

/** A small set of mutually exclusive choices, built on native radio inputs. */
export function Segmented<T extends string>({
  legend,
  hint,
  value,
  options,
  onChange,
}: {
  legend: string;
  hint?: string;
  value: T | undefined;
  options: SegmentOption<T>[];
  onChange: (value: T) => void;
}) {
  const name = useId();
  return (
    <fieldset className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 px-4 py-4 sm:px-5">
      <div className="min-w-0">
        <legend className="float-left text-sm font-medium text-ink">{legend}</legend>
        {hint ? <p className="clear-left pt-0.5 text-[13px] text-ink-2">{hint}</p> : null}
      </div>
      <div className="flex rounded-[10px] border border-stroke bg-canvas p-0.5">
        {options.map((option) => (
          <label key={option.value} className="relative">
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="peer sr-only"
            />
            <span className="flex h-8 cursor-pointer items-center gap-1.5 rounded-lg px-3 text-[13px] font-medium text-ink-2 transition-colors duration-150 peer-checked:bg-surface peer-checked:text-ink peer-checked:shadow-[0_1px_2px_rgb(0_0_0/0.12)] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-(--focus) hover:text-ink pointer-coarse:h-10">
              {option.icon ? <option.icon aria-hidden className="size-3.5" /> : null}
              {option.label}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
