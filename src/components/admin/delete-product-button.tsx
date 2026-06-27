"use client";

import { Trash2 } from "lucide-react";
import { deleteProduct } from "@/lib/data/products";

export function DeleteProductButton({
  productId,
  onDeleted,
}: {
  productId: string;
  onDeleted: () => void;
}) {
  function handleDelete() {
    if (!confirm("Delete this product? This cannot be undone.")) return;
    deleteProduct(productId);
    onDeleted();
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      aria-label="Delete product"
      className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-soft hover:bg-orange-light hover:text-orange-dark"
    >
      <Trash2 size={16} />
    </button>
  );
}
