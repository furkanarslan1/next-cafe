import { LucideIcon } from "lucide-react";
import { DrinkTemperature } from "./drinks/drinksType";
import { MealType } from "./meals/mealsType";

export interface MenuPageLinksType {
  id: number;
  slug: string;
  href: string;
  title: string;
  icon: LucideIcon;
}

// Main category
export type MainCategory = "drinks" | "meals" | "desserts";

export type Allergen = "gluten" | "milk" | "nuts" | "soy" | "egg";

// Product
export type ProductType = {
  id: number;
  slug: string;

  title: string;
  description?: string;
  price: number;
  image?: string;

  mainCategory: MainCategory;
  //for drinks
  drinkTemperature?: DrinkTemperature;
  //for meals
  mealType?: MealType;
  category: string;

  isActive: boolean;
  createdAt: string;

  displayOrder?: number;

  isFeatured?: boolean;
  isNew?: boolean;
  isPopular?: boolean;
  isOutOfStock?: boolean;

  calories?: number;
  allergens?: Allergen[];
  tags?: string[]; // vegan, gluten-free
};
