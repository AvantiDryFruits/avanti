import { ProductForm } from "@/components/admin/product-form";

export default function NewProductPage() {
  return (
    <div>
      <h1 className="font-display text-2xl text-ink">New Product</h1>
      <div className="mt-6">
        <ProductForm />
      </div>
    </div>
  );
}
