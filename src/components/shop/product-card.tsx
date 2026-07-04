"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { WeightPicker } from "./weight-picker";
import { useCart } from "@/contexts/cart-context";
import { formatPrice } from "@/lib/utils";
import { PRODUCT_CATEGORIES } from "@/lib/data/types";
import type { Product, WeightOption } from "@/lib/data/types";

export function ProductCard({ product }: { product: Product }) {
  const { addProduct } = useCart();
  const [grams, setGrams] = useState<WeightOption>(250);

  const categoryLabel = PRODUCT_CATEGORIES.find((c) => c.value === product.category)?.label;
  const price = product.price_per_gram * grams;

  return (
    <Card className="flex flex-col p-4">
      <div className="flex h-32 items-center justify-center overflow-hidden rounded-lg bg-sand text-xs text-muted">
        {product.image_urls[0] ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={product.image_urls[0]} alt={product.name} className="h-full w-full object-cover" />
        ) : (
          "No image"
        )}
      </div>

      {categoryLabel && (
        <Badge variant="green" className="mt-3 self-start">
          {categoryLabel}
        </Badge>
      )}
      <h3 className="mt-2 font-display text-lg text-ink">{product.name}</h3>
      {product.description && (
        <p className="mt-1 text-sm text-ink-soft line-clamp-2">{product.description}</p>
      )}

      <div className="mt-3">
        <WeightPicker selected={grams} onChange={setGrams} />
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="font-semibold text-ink">{formatPrice(price)}</span>
        <button
          type="button"
          disabled={!product.is_available}
          onClick={() => addProduct(product, grams)}
          className="flex items-center gap-1 rounded-full bg-orange px-3 py-2 text-sm font-medium text-on-dark transition-colors hover:bg-orange-dark disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Plus size={16} />
          {product.is_available ? "Add" : "Unavailable"}
        </button>
      </div>
    </Card>
  );
}
