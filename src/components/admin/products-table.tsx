"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Pencil } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getProducts, toggleProductAvailability } from "@/lib/data/products";
import { PRODUCT_CATEGORIES } from "@/lib/data/types";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/lib/data/types";
import { AvailabilityToggle } from "./availability-toggle";
import { DeleteProductButton } from "./delete-product-button";

export function ProductsTable() {
  const [products, setProducts] = useState<Product[] | null>(null);

  function refresh() {
    setProducts(getProducts());
  }

  useEffect(() => {
    refresh();
  }, []);

  if (products === null) {
    return <p className="text-sm text-ink-soft">Loading...</p>;
  }

  if (products.length === 0) {
    return <p className="text-sm text-ink-soft">No products yet.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-card border border-border bg-cream-card">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-border text-xs uppercase text-ink-soft">
          <tr>
            <th className="px-4 py-3">Product</th>
            <th className="px-4 py-3">Category</th>
            <th className="px-4 py-3">₹/gram</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            const categoryLabel = PRODUCT_CATEGORIES.find(
              (c) => c.value === product.category
            )?.label;
            return (
              <tr key={product.id} className="border-b border-border last:border-b-0">
                <td className="flex items-center gap-3 px-4 py-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-sand text-[9px] text-muted">
                    {product.image_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      "No img"
                    )}
                  </div>
                  <span className="font-medium text-ink">{product.name}</span>
                  {product.is_featured && <Badge variant="orange">Featured</Badge>}
                </td>
                <td className="px-4 py-3 text-ink-soft">{categoryLabel}</td>
                <td className="px-4 py-3 text-ink-soft">{formatPrice(product.price_per_gram)}</td>
                <td className="px-4 py-3">
                  <AvailabilityToggle
                    isAvailable={product.is_available}
                    onToggle={() => {
                      toggleProductAvailability(product.id);
                      refresh();
                    }}
                  />
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/products/${product.id}`}
                      aria-label="Edit product"
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-soft hover:bg-sand hover:text-ink"
                    >
                      <Pencil size={16} />
                    </Link>
                    <DeleteProductButton productId={product.id} onDeleted={refresh} />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
