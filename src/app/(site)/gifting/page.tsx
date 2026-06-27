import type { Metadata } from "next";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { SectionHeading } from "@/components/ui/section-heading";
import { HamperGrid } from "@/components/gifting/hamper-grid";
import { HAMPERS_SEED } from "@/data/hampers.seed";

export const metadata: Metadata = {
  title: "Gifting",
  description: "Curated gift hampers for festivals, corporate gifting and every occasion.",
};

export default function GiftingPage() {
  return (
    <PageWrapper>
      <SectionHeading align="left" eyebrow="Gifting" title="Hampers for Every Occasion" />
      <div className="mt-8">
        <HamperGrid hampers={HAMPERS_SEED} />
      </div>
    </PageWrapper>
  );
}
