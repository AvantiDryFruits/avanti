import { ProductGrid } from "@/components/shop/product-grid";
import type { Product } from "@/lib/data/types";

export function FeaturedProducts({ products }: { products: Product[] }) {
  if (products.length === 0) return null;
  return <ProductGrid products={products} />;
}
