"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import { formatPrice } from "@/lib/utils";
import type { CartLine } from "@/lib/data/types";

function weightLabel(grams: number): string {
  return grams >= 1000 ? `${grams / 1000}kg` : `${grams}g`;
}

function lineTotal(line: CartLine): number {
  return line.lineType === "product"
    ? line.pricePerGram * line.grams * line.quantity
    : line.price * line.quantity;
}

export function CartLineItem({ line }: { line: CartLine }) {
  const { updateQuantity, removeLine } = useCart();

  return (
    <div className="flex items-center gap-3 border-b border-border py-4 last:border-b-0">
      <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-sand text-center text-[10px] text-muted">
        {line.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={line.image_url} alt={line.name} className="h-full w-full object-cover" />
        ) : (
          "No image"
        )}
      </div>

      <div className="flex-1">
        <p className="font-medium text-ink">{line.name}</p>
        <p className="text-sm text-ink-soft">
          {line.lineType === "product" ? weightLabel(line.grams) : "Gift Hamper"}
        </p>

        <div className="mt-2 flex items-center gap-2">
          <button
            type="button"
            onClick={() => updateQuantity(line.id, line.quantity - 1)}
            aria-label="Decrease quantity"
            className="flex h-7 w-7 items-center justify-center rounded-full border border-border text-ink"
          >
            <Minus size={14} />
          </button>
          <span className="w-6 text-center text-sm">{line.quantity}</span>
          <button
            type="button"
            onClick={() => updateQuantity(line.id, line.quantity + 1)}
            aria-label="Increase quantity"
            className="flex h-7 w-7 items-center justify-center rounded-full border border-border text-ink"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>

      <div className="flex flex-col items-end gap-2">
        <p className="font-semibold text-ink">{formatPrice(lineTotal(line))}</p>
        <button
          type="button"
          onClick={() => removeLine(line.id)}
          aria-label="Remove item"
          className="text-ink-soft hover:text-orange-dark"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}
