"use client";

import Link from "next/link";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { SectionHeading } from "@/components/ui/section-heading";
import { CartLineItem } from "@/components/cart/cart-line-item";
import { OrderViaWhatsappButton } from "@/components/cart/order-via-whatsapp-button";
import { useCart } from "@/contexts/cart-context";
import { formatPrice } from "@/lib/utils";
import { buttonClasses } from "@/components/ui/button";

export default function CartPage() {
  const { lines, subtotal, clearCart } = useCart();

  return (
    <PageWrapper className="max-w-2xl">
      <SectionHeading align="left" eyebrow="Your Cart" title="Review & Order on WhatsApp" />

      <div className="mt-8">
        {lines.length === 0 ? (
          <div className="rounded-card border border-border bg-cream-card p-8 text-center">
            <p className="text-ink-soft">Your cart is empty.</p>
            <Link href="/shop" className={buttonClasses({ variant: "primary", className: "mt-4" })}>
              Browse Shop
            </Link>
          </div>
        ) : (
          <>
            <div className="rounded-card border border-border bg-cream-card px-4">
              {lines.map((line) => (
                <CartLineItem key={line.id} line={line} />
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between text-lg font-semibold text-ink">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <p className="mt-1 text-sm text-ink-soft">
              Final pricing confirmed over WhatsApp before dispatch.
            </p>

            <div className="mt-6 flex flex-col gap-3">
              <OrderViaWhatsappButton className="w-full" />
              <button
                type="button"
                onClick={clearCart}
                className="text-sm text-ink-soft underline"
              >
                Clear cart
              </button>
            </div>
          </>
        )}
      </div>
    </PageWrapper>
  );
}
