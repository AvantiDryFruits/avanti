import { Hero } from "@/components/home/hero";
import { CategoryTiles } from "@/components/home/category-tiles";
import { FeaturedProducts } from "@/components/home/featured-products";
import { AboutSnippet } from "@/components/home/about-snippet";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { SectionHeading } from "@/components/ui/section-heading";
import { getFeaturedProducts } from "@/lib/supabase/products";

export default async function HomePage() {
  const featured = await getFeaturedProducts();

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
