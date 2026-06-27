"use client";

import { WEIGHT_OPTIONS } from "@/lib/data/types";
import type { WeightOption } from "@/lib/data/types";
import { cn } from "@/lib/utils";

export function WeightPicker({
  selected,
  onChange,
}: {
  selected: WeightOption;
  onChange: (grams: WeightOption) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {WEIGHT_OPTIONS.map((opt) => (
        <button
          key={opt.grams}
          type="button"
          onClick={() => onChange(opt.grams)}
          className={cn(
            "rounded-full border px-2.5 py-1 text-xs font-medium transition-colors",
            selected === opt.grams
              ? "border-green bg-green text-on-dark"
              : "border-border bg-cream text-ink-soft hover:border-green"
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
