"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Pencil } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toggleProductAvailability, deleteProduct } from "@/lib/actions/products";
import { PRODUCT_CATEGORIES } from "@/lib/data/types";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/lib/data/types";
import { AvailabilityToggle } from "./availability-toggle";

export function ProductsTable({ products }: { products: Product[] }) {
  const router = useRouter();

  async function handleToggle(id: string) {
    await toggleProductAvailability(id);
    router.refresh();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this product? This cannot be undone.")) return;
    await deleteProduct(id);
    router.refresh();
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
                    {(product.image_urls ?? [])[0] ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={(product.image_urls ?? [])[0]}
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
                    onToggle={() => handleToggle(product.id)}
                  />
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/dashboard/products/${product.id}`}
                      aria-label="Edit product"
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-soft hover:bg-sand hover:text-ink"
                    >
                      <Pencil size={16} />
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDelete(product.id)}
                      aria-label="Delete product"
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-soft hover:bg-orange-light hover:text-orange-dark"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                    </button>
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
