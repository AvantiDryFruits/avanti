"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { readFromStorage, writeToStorage } from "@/lib/data/storage";
import type { CartLine, GiftHamper, Product, WeightOption } from "@/lib/data/types";

const CART_KEY = "cart";

function lineTotal(line: CartLine): number {
  return line.lineType === "product"
    ? line.pricePerGram * line.grams * line.quantity
    : line.price * line.quantity;
}

interface CartContextValue {
  lines: CartLine[];
  addProduct: (product: Product, grams: WeightOption, quantity?: number) => void;
  addHamper: (hamper: GiftHamper, quantity?: number) => void;
  updateQuantity: (lineId: string, quantity: number) => void;
  removeLine: (lineId: string) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    setLines(readFromStorage<CartLine[]>(CART_KEY, []));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) writeToStorage(CART_KEY, lines);
  }, [lines, hydrated]);

  function addProduct(product: Product, grams: WeightOption, quantity = 1) {
    const lineId = `${product.id}-${grams}`;
    setLines((prev) => {
      const existing = prev.find((l) => l.id === lineId);
      if (existing) {
        return prev.map((l) =>
          l.id === lineId ? { ...l, quantity: l.quantity + quantity } : l
        );
      }
      const newLine: CartLine = {
        lineType: "product",
        id: lineId,
        productId: product.id,
        name: product.name,
        slug: product.slug,
        category: product.category,
        image_url: product.image_urls[0] ?? null,
        grams,
        pricePerGram: product.price_per_gram,
        quantity,
      };
      return [...prev, newLine];
    });
    setIsDrawerOpen(true);
  }

  function addHamper(hamper: GiftHamper, quantity = 1) {
    const lineId = `hamper-${hamper.id}`;
    setLines((prev) => {
      const existing = prev.find((l) => l.id === lineId);
      if (existing) {
        return prev.map((l) =>
          l.id === lineId ? { ...l, quantity: l.quantity + quantity } : l
        );
      }
      const newLine: CartLine = {
        lineType: "hamper",
        id: lineId,
        hamperId: hamper.id,
        name: hamper.name,
        slug: hamper.slug,
        image_url: hamper.image_urls[0] ?? null,
        price: hamper.price,
        quantity,
      };
      return [...prev, newLine];
    });
    setIsDrawerOpen(true);
  }

  function updateQuantity(lineId: string, quantity: number) {
    if (quantity <= 0) {
      removeLine(lineId);
      return;
    }
    setLines((prev) => prev.map((l) => (l.id === lineId ? { ...l, quantity } : l)));
  }

  function removeLine(lineId: string) {
    setLines((prev) => prev.filter((l) => l.id !== lineId));
  }

  function clearCart() {
    setLines([]);
  }

  const itemCount = useMemo(() => lines.reduce((sum, l) => sum + l.quantity, 0), [lines]);
  const subtotal = useMemo(() => lines.reduce((sum, l) => sum + lineTotal(l), 0), [lines]);

  const value: CartContextValue = {
    lines,
    addProduct,
    addHamper,
    updateQuantity,
    removeLine,
    clearCart,
    itemCount,
    subtotal,
    isDrawerOpen,
    openDrawer: () => setIsDrawerOpen(true),
    closeDrawer: () => setIsDrawerOpen(false),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
