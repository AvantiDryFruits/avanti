import { StatsCard } from "@/components/admin/stats-card";
import { getProducts } from "@/lib/supabase/products";
import { getHampers } from "@/lib/supabase/hampers";

export default async function AdminDashboardPage() {
  const [products, hampers] = await Promise.all([getProducts(), getHampers()]);

  const stats = {
    products: products.length,
    available: products.filter((p) => p.is_available).length,
    hampers: hampers.length,
    hampersAvailable: hampers.filter((h) => h.is_available).length,
  };

  return (
    <div>
      <h1 className="font-display text-2xl text-ink">Dashboard</h1>
      <p className="mt-1 text-sm text-ink-soft">Quick overview of your catalog.</p>

      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatsCard label="Total Products" value={stats.products} />
        <StatsCard label="Available Products" value={stats.available} />
        <StatsCard label="Total Hampers" value={stats.hampers} />
        <StatsCard label="Available Hampers" value={stats.hampersAvailable} />
      </div>
    </div>
  );
}
