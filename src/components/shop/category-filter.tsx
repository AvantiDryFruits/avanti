import Link from "next/link";
import { PRODUCT_CATEGORIES, type ProductCategory } from "@/lib/data/types";
import { cn } from "@/lib/utils";

export function CategoryFilter({ active }: { active?: ProductCategory }) {
  const pillClasses = (isActive: boolean) =>
    cn(
      "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
      isActive
        ? "border-green bg-green text-on-dark"
        : "border-border bg-cream-card text-ink-soft hover:border-green"
    );

  return (
    <div className="flex flex-wrap gap-2">
      <Link href="/shop" className={pillClasses(!active)}>
        All
      </Link>
      {PRODUCT_CATEGORIES.map((cat) => (
        <Link
          key={cat.value}
          href={`/shop?category=${cat.value}`}
          className={pillClasses(active === cat.value)}
        >
          {cat.label}
        </Link>
      ))}
    </div>
  );
}
