import { Hero } from "@/components/home/hero";
import { CategoryTiles } from "@/components/home/category-tiles";
import { FeaturedProducts } from "@/components/home/featured-products";
import { AboutSnippet } from "@/components/home/about-snippet";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { SectionHeading } from "@/components/ui/section-heading";
import { PRODUCTS_SEED } from "@/data/products.seed";

export default function HomePage() {
  const featured = PRODUCTS_SEED.filter((p) => p.is_featured);

  return (
    <>
      <Hero />

      <PageWrapper>
        <SectionHeading eyebrow="Browse" title="Shop by Category" />
        <div className="mt-8">
          <CategoryTiles />
        </div>
      </PageWrapper>

      <PageWrapper className="pt-0">
        <SectionHeading eyebrow="Best Sellers" title="Customer Favourites" />
        <div className="mt-8">
          <FeaturedProducts products={featured} />
        </div>
      </PageWrapper>

      <PageWrapper className="pt-0">
        <AboutSnippet />
      </PageWrapper>
    </>
  );
}
