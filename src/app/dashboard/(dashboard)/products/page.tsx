import Link from "next/link";
import { Plus } from "lucide-react";
import { ProductsTable } from "@/components/admin/products-table";
import { buttonClasses } from "@/components/ui/button";
import { getProducts } from "@/lib/supabase/products";

export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl text-ink">Products</h1>
          <p className="mt-1 text-sm text-ink-soft">Manage your shop catalog.</p>
        </div>
        <Link href="/dashboard/products/new" className={buttonClasses({ variant: "primary" })}>
          <Plus size={16} />
          New Product
        </Link>
      </div>

      <div className="mt-6">
        <ProductsTable products={products} />
      </div>
    </div>
  );
}
