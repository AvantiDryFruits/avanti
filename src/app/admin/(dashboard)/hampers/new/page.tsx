import { HamperForm } from "@/components/admin/hamper-form";

export default function NewHamperPage() {
  return (
    <div>
      <h1 className="font-display text-2xl text-ink">New Hamper</h1>
      <div className="mt-6">
        <HamperForm />
      </div>
    </div>
  );
}
