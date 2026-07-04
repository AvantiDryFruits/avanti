"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ProductForm } from "@/components/admin/product-form";
import { getProductById } from "@/lib/actions/products";
import type { Product } from "@/lib/data/types";

export default function EditProductPage() {
  const params = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null | undefined>(undefined);

  useEffect(() => {
    getProductById(params.id).then((p) => setProduct(p ?? null));
  }, [params.id]);

  if (product === undefined) {
    return <p className="text-sm text-ink-soft">Loading...</p>;
  }

  if (product === null) {
    return <p className="text-sm text-ink-soft">Product not found.</p>;
  }

  return (
    <div>
      <h1 className="font-display text-2xl text-ink">Edit Product</h1>
      <div className="mt-6">
        <ProductForm product={product} />
      </div>
    </div>
  );
}
