import Link from "next/link";
import { Card } from "@/components/ui/card";
import { PRODUCT_CATEGORIES } from "@/lib/data/types";

export function CategoryTiles() {
  return (
    <div className="mx-auto grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
      {PRODUCT_CATEGORIES.map((cat) => (
        <Link key={cat.value} href={`/shop?category=${cat.value}`}>
          <Card className="flex h-28 flex-col items-center justify-center text-center">
            <span className="font-display text-base text-ink">{cat.label}</span>
            <span className="mt-1 text-xs text-orange-dark">Order Now</span>
          </Card>
        </Link>
      ))}
    </div>
  );
}
