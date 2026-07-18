"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import { cn, formatPrice } from "@/lib/utils";
import { CartLineItem } from "./cart-line-item";
import { OrderViaWhatsappButton } from "./order-via-whatsapp-button";

export function CartDrawer() {
  const { lines, subtotal, isDrawerOpen, closeDrawer } = useCart();

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-[60] bg-ink/40 transition-opacity",
          isDrawerOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={closeDrawer}
      />
      <aside
        className={cn(
          "fixed right-0 top-0 z-[61] flex h-full w-full max-w-sm flex-col bg-cream shadow-xl transition-transform",
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between border-b border-border px-4 py-4">
          <p className="font-display text-lg text-ink">Your Cart</p>
          <button
            type="button"
            onClick={closeDrawer}
            aria-label="Close cart"
            className="text-ink-soft"
          >
            <X size={22} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4">
          {lines.length === 0 ? (
            <p className="py-10 text-center text-sm text-ink-soft">Your cart is empty.</p>
          ) : (
            lines.map((line) => <CartLineItem key={line.id} line={line} />)
          )}
        </div>

        {lines.length > 0 && (
          <div className="border-t border-border px-4 py-4">
            <div className="mb-3 flex items-center justify-between text-sm font-semibold text-ink">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <p className="mb-3 rounded-card border border-yellow-400 bg-yellow-100 px-3 py-2 text-xs text-yellow-900">
              Delivery only within Mulund (orders above Rs. 1000). Outside Mulund, delivery-app
              charges apply.
            </p>
            <OrderViaWhatsappButton className="w-full" />
            <Link
              href="/cart"
              onClick={closeDrawer}
              className="mt-2 block text-center text-sm text-ink-soft underline"
            >
              View full cart
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
