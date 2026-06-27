"use client";

import { Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";

export function ContentsListInput({
  items,
  onChange,
}: {
  items: string[];
  onChange: (items: string[]) => void;
}) {
  function updateItem(index: number, value: string) {
    onChange(items.map((item, i) => (i === index ? value : item)));
  }

  function removeItem(index: number) {
    onChange(items.filter((_, i) => i !== index));
  }

  function addItem() {
    onChange([...items, ""]);
  }

  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div key={index} className="flex gap-2">
          <Input
            value={item}
            onChange={(e) => updateItem(index, e.target.value)}
            placeholder="e.g. 250g Almonds"
          />
          <button
            type="button"
            onClick={() => removeItem(index)}
            aria-label="Remove item"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-border text-ink-soft hover:bg-sand"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={addItem}
        className="flex items-center gap-1 text-sm font-medium text-green-dark"
      >
        <Plus size={16} />
        Add item
      </button>
    </div>
  );
}
