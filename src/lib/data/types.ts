export type ProductCategory =
  | "dry-fruits"
  | "premium"
  | "sweets"
  | "farsan"
  | "namkeen"
  | "masala";

export const PRODUCT_CATEGORIES: { value: ProductCategory; label: string }[] = [
  { value: "dry-fruits", label: "Dry Fruits" },
  { value: "premium", label: "Premium" },
  { value: "sweets", label: "Sweets" },
  { value: "farsan", label: "Farsan" },
  { value: "namkeen", label: "Namkeen" },
  { value: "masala", label: "Masala" },
];

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  category: ProductCategory;
  price_per_gram: number;
  image_url: string | null;
  is_available: boolean;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface GiftHamper {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  contents: string[];
  image_url: string | null;
  is_available: boolean;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

export type WeightOption = 100 | 250 | 500 | 1000;

export const WEIGHT_OPTIONS: { grams: WeightOption; label: string }[] = [
  { grams: 100, label: "100g" },
  { grams: 250, label: "250g" },
  { grams: 500, label: "500g" },
  { grams: 1000, label: "1kg" },
];

export type CartLine =
  | {
      lineType: "product";
      id: string;
      productId: string;
      name: string;
      slug: string;
      category: ProductCategory;
      image_url: string | null;
      grams: WeightOption;
      pricePerGram: number;
      quantity: number;
    }
  | {
      lineType: "hamper";
      id: string;
      hamperId: string;
      name: string;
      slug: string;
      image_url: string | null;
      price: number;
      quantity: number;
    };
