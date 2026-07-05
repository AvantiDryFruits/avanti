import type { Metadata } from "next";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { SectionHeading } from "@/components/ui/section-heading";
import { HamperGrid } from "@/components/gifting/hamper-grid";
import { getHampers } from "@/lib/supabase/hampers";

export const metadata: Metadata = {
  title: "Gifting",
  description: "Curated gift hampers for festivals, corporate gifting and every occasion.",
};

export default async function GiftingPage() {
  const hampers = await getHampers();

  return (
    <PageWrapper>
      <SectionHeading align="left" eyebrow="Gifting" title="Hampers for Every Occasion" />
      <div className="mt-8">
        <HamperGrid hampers={hampers} />
      </div>
    </PageWrapper>
  );
}
