"use client";

import { Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useCart } from "@/contexts/cart-context";
import { formatPrice } from "@/lib/utils";
import type { GiftHamper } from "@/lib/data/types";

export function HamperCard({ hamper }: { hamper: GiftHamper }) {
  const { addHamper } = useCart();

  return (
    <Card className="flex flex-col p-4">
      <div className="flex h-36 items-center justify-center overflow-hidden rounded-lg bg-sand text-xs text-muted">
        {hamper.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={hamper.image_url} alt={hamper.name} className="h-full w-full object-cover" />
        ) : (
          "No image"
        )}
      </div>

      <h3 className="mt-3 font-display text-lg text-ink">{hamper.name}</h3>
      {hamper.description && <p className="mt-1 text-sm text-ink-soft">{hamper.description}</p>}

      <div className="mt-3 flex flex-wrap gap-1.5">
        {hamper.contents.map((item) => (
          <span key={item} className="rounded-full bg-sand px-2.5 py-1 text-xs text-ink-soft">
            {item}
          </span>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="font-semibold text-ink">{formatPrice(hamper.price)}</span>
        <button
          type="button"
          disabled={!hamper.is_available}
          onClick={() => addHamper(hamper)}
          className="flex items-center gap-1 rounded-full bg-orange px-3 py-2 text-sm font-medium text-on-dark transition-colors hover:bg-orange-dark disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Plus size={16} />
          {hamper.is_available ? "Add" : "Sold Out"}
        </button>
      </div>
    </Card>
  );
}
