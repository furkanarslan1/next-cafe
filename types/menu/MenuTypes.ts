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

// Alerjen tipleri (gluten, sut, findik, soya, yumurta)
// Allergen types (gluten, milk, nuts, soy, egg)
export type Allergen = "gluten" | "milk" | "nuts" | "soy" | "egg";

// Urun varyant sistemi - boyutlandirma icin (Kucuk, Buyuk vb.)
// Product variant system - for sizing (Small, Large etc.)
export interface ProductVariant {
  id: string;
  name: string;
  price: number;
}

// Ortak kategori tipi - tum alt kategoriler icin (Coffee, Tea, Salads vb.)
// Common category type - for all subcategories (Coffee, Tea, Salads etc.)
export interface CategoryType {
  id: string;
  title: string;
  slug: string;
  mainCategory: MainCategory;
  subType: DrinkTemperature | MealTime | DessertType;
}

// Temel urun tipi - tum urunlerin ortak alanlari
// Base product type - common fields for all products
interface BaseProduct {
  id: string;
  slug: string;
  title: string;
  description?: string;
  image?: string;

  basePrice?: number;
  variants?: ProductVariant[];

  categoryId: string;
  isActive: boolean;
  isFeatured?: boolean;
  isNew?: boolean;
  isPopular?: boolean;
  isOutOfStock?: boolean;

  calories?: number;
  allergens?: Allergen[];
  tags?: string[];
  createdAt: string;
}

// Icecek urunu - sicaklik bilgisi tasir
// Drink product - carries temperature info
export interface DrinkProduct extends BaseProduct {
  mainCategory: "drinks";
  temperature: DrinkTemperature;
}

// Yemek urunu - ogun bilgisi tasir
// Meal product - carries meal time info
export interface MealProduct extends BaseProduct {
  mainCategory: "meals";
  mealTime: MealTime;
}

// Tatli urunu - tatli turu bilgisi tasir
// Dessert product - carries dessert type info
export interface DessertProduct extends BaseProduct {
  mainCategory: "desserts";
  dessertType: DessertType;
}

// Tum urunleri kapsayan birlesik tip (discriminated union)
// Union type covering all products (discriminated union)
export type Product = DrinkProduct | MealProduct | DessertProduct;
