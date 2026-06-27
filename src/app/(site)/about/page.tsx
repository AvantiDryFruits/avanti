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
          Avanti Dry Fruits is a neighbourhood store in Mulund West, Mumbai, bringing together
          premium dry fruits, nuts, masala, traditional sweets, farsan and namkeen under one roof.
          Every product is hand-checked for quality before it reaches our shelves.
        </p>
        <p>
          Whether you&apos;re stocking up for the week, prepping for a festival, or putting
          together a gift hamper for someone special, we keep a wide range on hand and weigh out
          exactly what you need — by the gram, not just by the packet.
        </p>
        <p>
          We keep ordering simple: browse the shop, build your cart, and send it to us directly on
          WhatsApp. No accounts, no apps, no payment gateway friction — just a quick chat to
          confirm your order.
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
