import { LucideIcon } from "lucide-react";

// Menu sayfa linkleri (navbar'daki drinks, meals, desserts linkleri)
// Menu page links (drinks, meals, desserts links in navbar)
export interface MenuPageLinksType {
  id: number;
  slug: string;
  href: string;
  title: string;
  icon: LucideIcon;
}

// Ana kategori tipleri (icecekler, yemekler, tatlilar)
// Main category types (drinks, meals, desserts)
export type MainCategory = "drinks" | "meals" | "desserts";

// Icecek sicaklik tipleri (sicak, soguk)
// Drink temperature types (hot, cold)
export type DrinkTemperature = "hot" | "cold";

// Yemek zamani tipleri (kahvalti, ogle, aksam)
// Meal time types (breakfast, lunch, dinner)
export type MealTime = "breakfast" | "lunch" | "dinner";

// Tatli turleri (pasta, hamur isi, kurabiye, dondurma, ozel)
// Dessert types (cake, pastry, cookie, ice-cream, special)
export type DessertType =
  | "cake"
  | "pastry"
  | "cookie"
  | "ice-cream"
  | "special";

// Alt tip birlestirme (tum subType degerleri)
// Sub type union (all subType values)
export type SubType = DrinkTemperature | MealTime | DessertType;

// Alerjen tipleri (gluten, sut, findik, soya, yumurta)
// Allergen types (gluten, milk, nuts, soy, egg)
export type Allergen = "gluten" | "milk" | "nuts" | "soy" | "egg";

// Urun varyant tipi (S/M/L, tek/cift shot vb.)
// Product variant type (S/M/L, single/double shot etc.)
export interface ProductVariant {
  name: string;
  price: number;
}

// Kategori tipi - DB categories tablosuna karsilik gelir
// Category type - maps to DB categories table
export interface CategoryType {
  id: string;
  slug: string;
  label: string;
  mainCategory: MainCategory;
  subType: SubType;
  isActive: boolean;
  createdAt: string;
}

// Urun tipi - DB products tablosuna karsilik gelir
// Product type - maps to DB products table
// mainCategory ve subType product'ta saklanmaz, category join ile alinir
// mainCategory and subType are not stored on product, fetched via category join
export interface Product {
  id: string;
  slug: string;
  title: string;
  description?: string;
  imageUrl?: string;
  imagePublicId?: string;
  price: number;
  discountRate: number;
  variants: ProductVariant[];
  categoryId: string;
  isActive: boolean;
  isFeatured: boolean;
  isNew: boolean;
  isPopular: boolean;
  isOutOfStock: boolean;
  calories?: number;
  allergens: Allergen[];
  tags: string[];
  createdAt: string;
}

//PAGINATION

export interface PaginationResult {
  products: Product[];
  totalCount: number;
  totalPages: number;
}

// Urun + kategori bilgisi (join sonrasi, listeleme icin)
// Product with category info (after join, for listing)
export interface ProductWithCategory extends Product {
  category: CategoryType;
}
