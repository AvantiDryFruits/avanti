"use client";

import { ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/cart-context";

export function CartIcon() {
  const { itemCount, openDrawer } = useCart();

  return (
    <button
      type="button"
      onClick={openDrawer}
      aria-label="View cart"
      className="relative flex h-10 w-10 items-center justify-center rounded-lg text-green-dark"
    >
      <ShoppingBag size={22} />
      {itemCount > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange px-1 text-[11px] font-semibold text-on-dark">
          {itemCount}
        </span>
      )}
    </button>
  );
}
