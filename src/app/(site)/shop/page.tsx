import type { Metadata } from "next";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { SectionHeading } from "@/components/ui/section-heading";
import { CategoryFilter } from "@/components/shop/category-filter";
import { ProductGrid } from "@/components/shop/product-grid";
import { PRODUCTS_SEED } from "@/data/products.seed";
import { PRODUCT_CATEGORIES, type ProductCategory } from "@/lib/data/types";

export const metadata: Metadata = {
  title: "Shop",
  description: "Dry fruits, premium nuts, sweets, farsan, namkeen and masala — order by weight.",
};

function isValidCategory(value: string | undefined): value is ProductCategory {
  return PRODUCT_CATEGORIES.some((c) => c.value === value);
}

export default function ShopPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const category = isValidCategory(searchParams.category) ? searchParams.category : undefined;
  const products = category
    ? PRODUCTS_SEED.filter((p) => p.category === category)
    : PRODUCTS_SEED;

  return (
    <PageWrapper>
      <SectionHeading align="left" eyebrow="Shop" title="Dry Fruits, Masala, Sweets & Farsan" />
      <div className="mt-6">
        <CategoryFilter active={category} />
      </div>
      <div className="mt-8">
        <ProductGrid products={products} />
      </div>
    </PageWrapper>
  );
}
