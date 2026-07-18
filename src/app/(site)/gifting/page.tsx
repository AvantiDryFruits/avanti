import type { Metadata } from "next";
import { MessageCircle } from "lucide-react";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { SectionHeading } from "@/components/ui/section-heading";
import { HamperGrid } from "@/components/gifting/hamper-grid";
import { getHampers } from "@/lib/supabase/hampers";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { buttonClasses } from "@/components/ui/button";

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
      <div className="mt-8 flex flex-col items-start gap-3 rounded-card border border-border bg-cream-card p-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-ink-soft">For custom gifting options, text us on WhatsApp.</p>
        <a
          href={getWhatsAppUrl("Hi Avanti Dry Fruits! I'd like to ask about custom gifting options.")}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClasses({ variant: "whatsapp" })}
        >
          <MessageCircle size={18} />
          Chat on WhatsApp
        </a>
      </div>
    </PageWrapper>
  );
}
