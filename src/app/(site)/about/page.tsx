import type { Metadata } from "next";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import { CONTACT_EMAIL, CONTACT_PHONE_DISPLAY, SHOP_ADDRESS, TAGLINE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About Us",
  description: "A trusted neighbourhood dry fruits, masala and sweets store in Mulund West, Mumbai.",
};

export default function AboutPage() {
  return (
    <PageWrapper className="max-w-3xl">
      <SectionHeading eyebrow="About Us" title={TAGLINE} />

      <div className="mt-8 space-y-6 text-ink-soft">
        <p>
          Welcome to Avanti Dry Fruits, your home for premium dry fruits, Namkeen (farsan), and
          authentic Indian sweets, along with our specially crafted masalas known for their rich,
          excellent taste.
        </p>
        <p>
          We&apos;re a family business, proudly serving customers since 1978. What started as a
          commitment to quality has grown into a legacy, one we&apos;ve carried through generations.
        </p>
        <p>
          Our promise has always been simple: quality and purity, first and always. Every product
          that leaves our store carries the same standard we set decades ago.
        </p>
        <p>
          Over the years, we&apos;ve been fortunate to earn the trust of customers across Mumbai,
          across India, and even abroad.
        </p>
        <p className="font-medium text-ink">
          At the heart of it, our motto has never changed: customer satisfaction, always.
          We&apos;ve stood by it since 1978, and we promise to keep standing by it.
        </p>
        <p className="font-display text-lg font-semibold text-green-dark">
          The Trust Of Purity And Taste
        </p>
      </div>

      <Card variant="outline" className="mt-8 p-6">
        <p className="font-medium text-ink">Visit Us</p>
        <p className="mt-1 text-sm text-ink-soft">{SHOP_ADDRESS}</p>
        <p className="mt-3 font-medium text-ink">Contact</p>
        <p className="mt-1 text-sm text-ink-soft">{CONTACT_PHONE_DISPLAY}</p>
        <p className="text-sm text-ink-soft">{CONTACT_EMAIL}</p>
      </Card>
    </PageWrapper>
  );
}
