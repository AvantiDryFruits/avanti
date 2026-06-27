import { WHATSAPP_NUMBER } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";
import type { CartLine } from "@/lib/data/types";

function lineTotal(line: CartLine): number {
  return line.lineType === "product"
    ? line.pricePerGram * line.grams * line.quantity
    : line.price * line.quantity;
}

function weightLabel(grams: number): string {
  return grams >= 1000 ? `${grams / 1000}kg` : `${grams}g`;
}

function lineLabel(line: CartLine): string {
  if (line.lineType === "product") {
    return `${line.name} (${weightLabel(line.grams)}) x${line.quantity}`;
  }
  return `${line.name} (Hamper) x${line.quantity}`;
}

export function buildOrderMessage(lines: CartLine[]): string {
  if (lines.length === 0) return "";

  const itemRows = lines.map((line) => `- ${lineLabel(line)} — ${formatPrice(lineTotal(line))}`);
  const total = lines.reduce((sum, line) => sum + lineTotal(line), 0);

  return [
    "Hi Avanti Dry Fruits! I'd like to order:",
    "",
    ...itemRows,
    "",
    `Total: ${formatPrice(total)}`,
  ].join("\n");
}

export function getWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
