import type { Metadata } from "next";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { SectionHeading } from "@/components/ui/section-heading";
import { Accordion } from "@/components/faqs/accordion";

export const metadata: Metadata = {
  title: "FAQs",
  description: "Ordering, payment, delivery and hamper questions, answered.",
};

const FAQ_ITEMS = [
  {
    question: "How do I place an order?",
    answer:
      'Browse Shop or Gifting, add items to your cart, and tap "Order via WhatsApp." Your itemised order opens directly in WhatsApp — just hit send and we\'ll confirm availability and delivery details with you there.',
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We currently confirm payment directly over WhatsApp once your order is finalised — cash or UPI on delivery/pickup.",
  },
  {
    question: "Can I choose how much I want of an item?",
    answer:
      "Yes — most products can be ordered in 100g, 250g, 500g or 1kg. Pick a weight on the product card before adding it to your cart. If you need a different quantity, just mention it on WhatsApp when you order and we'll adjust it for you.",
  },
  {
    question: "Do you deliver, or is it pickup only?",
    answer:
      "We serve Mulund and nearby areas. Share your address on WhatsApp after ordering and we'll confirm delivery or pickup based on your location.",
  },
  {
    question: "Can gift hampers be customised?",
    answer:
      "Our hampers come as fixed bundles, but if you'd like to swap an item or build a custom box, just mention it on WhatsApp when you order and we'll work it out with you.",
  },
  {
    question: "How fresh are your products?",
    answer:
      "Everything is stocked in small batches and hand-checked before it reaches the shelf, so you're always getting fresh stock.",
  },
];

export default function FaqsPage() {
  return (
    <PageWrapper className="max-w-2xl">
      <SectionHeading eyebrow="FAQs" title="Frequently Asked Questions" />
      <div className="mt-8">
        <Accordion items={FAQ_ITEMS} />
      </div>
    </PageWrapper>
  );
}
