import Link from "next/link";
import { Card } from "@/components/ui/card";
import { SHOP_ADDRESS } from "@/lib/constants";

export function AboutSnippet() {
  return (
    <Card variant="outline" className="p-6 md:p-8">
      <p className="font-display text-xl text-ink">A trusted neighbourhood name in Mulund West</p>
      <p className="mt-3 text-ink-soft">
        Avanti Dry Fruits brings together the finest dry fruits, premium nuts, traditional
        sweets, farsan, namkeen and masala — sourced and quality-checked for our regular
        customers.
      </p>
      <p className="mt-3 text-sm text-ink-soft">{SHOP_ADDRESS}</p>
      <Link
        href="/about"
        className="mt-4 inline-block text-sm font-medium text-green-dark underline"
      >
        More about us
      </Link>
    </Card>
  );
}
