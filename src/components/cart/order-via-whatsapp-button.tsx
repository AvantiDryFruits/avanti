"use client";

import { MessageCircle } from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import { buildOrderMessage, getWhatsAppUrl } from "@/lib/whatsapp";
import { buttonClasses } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function OrderViaWhatsappButton({ className }: { className?: string }) {
  const { lines } = useCart();
  const disabled = lines.length === 0;
  const href = disabled ? "#" : getWhatsAppUrl(buildOrderMessage(lines));

  return (
    <a
      href={href}
      target={disabled ? undefined : "_blank"}
      rel={disabled ? undefined : "noopener noreferrer"}
      aria-disabled={disabled}
      className={cn(
        buttonClasses({ variant: "whatsapp", size: "lg" }),
        disabled && "pointer-events-none opacity-50",
        className
      )}
    >
      <MessageCircle size={18} />
      Order via WhatsApp
    </a>
  );
}
