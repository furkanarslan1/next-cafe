import { CategoryType, Product } from "@/types/menu/MenuTypes";
import React, { Suspense } from "react";
import MenuCategories from "../_components/MenuCategories";
import MenuItems from "../_components/MenuItems";

export const mockMealsCategories: CategoryType[] = [
  // ================= BREAKFAST =================
  { id: "1", label: "Breakfast Plates", slug: "plate", mainCategory: "meals", subType: "breakfast", isActive: true, createdAt: "2026-02-10" },
  { id: "2", label: "Toasts", slug: "toast", mainCategory: "meals", subType: "breakfast", isActive: true, createdAt: "2026-02-10" },
  // ================= LUNCH =================
  { id: "3", label: "Salads", slug: "salad", mainCategory: "meals", subType: "lunch", isActive: true, createdAt: "2026-02-10" },
  { id: "4", label: "Burgers", slug: "burger", mainCategory: "meals", subType: "lunch", isActive: true, createdAt: "2026-02-10" },
  // ================= DINNER =================
  { id: "5", label: "Pastas", slug: "pasta", mainCategory: "meals", subType: "dinner", isActive: true, createdAt: "2026-02-10" },
];

export const mockMeals: Product[] = [
  // ================= MEALS - BREAKFAST =================
  {
    id: "5",
    slug: "classic-breakfast",
    title: "Classic Breakfast Plate",
    description: "Eggs, toasted bread, olives and cheese.",
    price: 180,
    discountRate: 0,
    variants: [],
    imageUrl: "/customer-favorites/brownie.webp",
    categoryId: "1",
    isActive: true,
    isFeatured: true,
    isNew: false,
    isPopular: false,
    isOutOfStock: false,
    calories: 450,
    allergens: ["gluten", "egg", "milk"],
    tags: ["traditional"],
    createdAt: "2026-02-10",
  },
  {
    id: "6",
    slug: "avocado-toast",
    title: "Avocado Toast",
    description: "Sourdough bread topped with smashed avocado.",
    price: 160,
    discountRate: 0,
    variants: [],
    imageUrl: "/customer-favorites/brownie.webp",
    categoryId: "2",
    isActive: true,
    isFeatured: false,
    isNew: true,
    isPopular: false,
    isOutOfStock: false,
    calories: 320,
    allergens: ["gluten"],
    tags: ["vegan"],
    createdAt: "2026-02-10",
  },
  // ================= MEALS - LUNCH =================
  {
    id: "7",
    slug: "grilled-chicken-salad",
    title: "Grilled Chicken Salad",
    description: "Fresh greens with grilled chicken breast.",
    price: 220,
    discountRate: 0,
    variants: [],
    imageUrl: "/customer-favorites/brownie.webp",
    categoryId: "3",
    isActive: true,
    isFeatured: false,
    isNew: false,
    isPopular: true,
    isOutOfStock: false,
    calories: 380,
    allergens: [],
    tags: ["high-protein"],
    createdAt: "2026-02-10",
  },
  {
    id: "8",
    slug: "beef-burger",
    title: "Beef Burger",
    description: "Juicy beef patty with cheddar cheese.",
    price: 250,
    discountRate: 0,
    variants: [],
    imageUrl: "/customer-favorites/brownie.webp",
    categoryId: "4",
    isActive: true,
    isFeatured: false,
    isNew: false,
    isPopular: false,
    isOutOfStock: false,
    calories: 650,
    allergens: ["gluten", "milk"],
    tags: ["classic"],
    createdAt: "2026-02-10",
  },
  // ================= MEALS - DINNER =================
  {
    id: "9",
    slug: "alfredo-pasta",
    title: "Chicken Alfredo Pasta",
    description: "Creamy alfredo sauce with grilled chicken.",
    price: 270,
    discountRate: 0,
    variants: [],
    imageUrl: "/customer-favorites/brownie.webp",
    categoryId: "5",
    isActive: true,
    isFeatured: true,
    isNew: false,
    isPopular: false,
    isOutOfStock: false,
    calories: 720,
    allergens: ["gluten", "milk"],
    tags: ["creamy"],
    createdAt: "2026-02-10",
  },
];

interface MealsPageProps {
  searchParams: Promise<{ mealType: string; category: string }>;
}

export default async function MealsPage({ searchParams }: MealsPageProps) {
  const { mealType, category } = await searchParams;
  const Meal = mealType || "breakfast";
  const filteredCategories = mockMealsCategories.filter(
    (cat) => cat.subType === Meal,
  );

  const selectedCategory = category || filteredCategories[0]?.id || "";

  const filteredMeals = mockMeals.filter(
    (meal) => meal.categoryId === selectedCategory,
  );
  return (
    <div>
      <Suspense fallback={<div className="h-20">Loading...</div>}>
        <MenuCategories
          selectedCategory={selectedCategory}
          categories={filteredCategories}
        />
      </Suspense>
      <MenuItems items={filteredMeals} />
    </div>
  );
}