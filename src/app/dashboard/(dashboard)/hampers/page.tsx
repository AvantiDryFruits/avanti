import Link from "next/link";
import { Plus } from "lucide-react";
import { HampersTable } from "@/components/admin/hampers-table";
import { buttonClasses } from "@/components/ui/button";
import { getHampers } from "@/lib/supabase/hampers";

export default async function AdminHampersPage() {
  const hampers = await getHampers();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl text-ink">Hampers</h1>
          <p className="mt-1 text-sm text-ink-soft">Manage your gift hampers.</p>
        </div>
        <Link href="/dashboard/hampers/new" className={buttonClasses({ variant: "primary" })}>
          <Plus size={16} />
          New Hamper
        </Link>
      </div>

      <div className="mt-6">
        <HampersTable hampers={hampers} />
      </div>
    </div>
  );
}
