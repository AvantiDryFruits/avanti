import { Sidebar } from "@/components/admin/sidebar";

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-cream">
      <Sidebar />
      <main className="flex-1 overflow-x-hidden p-6 md:p-8">{children}</main>
    </div>
  );
}
