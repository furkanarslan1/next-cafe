import { MealsCategoryType } from "@/types/menu/meals/mealsType";
import { ProductType } from "@/types/menu/MenuTypes";
import React, { Suspense } from "react";
import MenuCategories from "../_components/MenuCategories";
import MenuItems from "../_components/MenuItems";

export const mockMealsCategories: MealsCategoryType[] = [
  // ================= BREAKFAST =================
  {
    id: 1,
    title: "Breakfast Plates",
    slug: "plate",
    mealType: "breakfast",
  },
  {
    id: 2,
    title: "Toasts",
    slug: "toast",
    mealType: "breakfast",
  },

  // ================= LUNCH =================
  {
    id: 3,
    title: "Salads",
    slug: "salad",
    mealType: "lunch",
  },
  {
    id: 4,
    title: "Burgers",
    slug: "burger",
    mealType: "lunch",
  },

  // ================= DINNER =================
  {
    id: 5,
    title: "Pastas",
    slug: "pasta",
    mealType: "dinner",
  },
];

export const mockMeals: ProductType[] = [
  // ================= MEALS - BREAKFAST =================
  {
    id: 5,
    slug: "classic-breakfast",
    title: "Classic Breakfast Plate",
    description: "Eggs, toasted bread, olives and cheese.",
    price: 180,
    image: "/customer-favorites/brownie.webp",
    mainCategory: "meals",
    mealType: "breakfast",
    category: "plate",
    isActive: true,
    createdAt: "2026-02-10",
    isFeatured: true,
    calories: 450,
    allergens: ["gluten", "egg", "milk"],
    tags: ["traditional"],
  },
  {
    id: 6,
    slug: "avocado-toast",
    title: "Avocado Toast",
    description: "Sourdough bread topped with smashed avocado.",
    price: 160,
    image: "/customer-favorites/brownie.webp",
    mainCategory: "meals",
    mealType: "breakfast",
    category: "toast",
    isActive: true,
    createdAt: "2026-02-10",
    isNew: true,
    calories: 320,
    allergens: ["gluten"],
    tags: ["vegan"],
  },

  // ================= MEALS - LUNCH =================
  {
    id: 7,
    slug: "grilled-chicken-salad",
    title: "Grilled Chicken Salad",
    description: "Fresh greens with grilled chicken breast.",
    price: 220,
    image: "/customer-favorites/brownie.webp",
    mainCategory: "meals",
    mealType: "lunch",
    category: "salad",
    isActive: true,
    createdAt: "2026-02-10",
    isPopular: true,
    calories: 380,
    allergens: [],
    tags: ["high-protein"],
  },
  {
    id: 8,
    slug: "beef-burger",
    title: "Beef Burger",
    description: "Juicy beef patty with cheddar cheese.",
    price: 250,
    image: "/customer-favorites/brownie.webp",
    mainCategory: "meals",
    mealType: "lunch",
    category: "burger",
    isActive: true,
    createdAt: "2026-02-10",
    calories: 650,
    allergens: ["gluten", "milk"],
    tags: ["classic"],
  },

  // ================= MEALS - DINNER =================
  {
    id: 9,
    slug: "alfredo-pasta",
    title: "Chicken Alfredo Pasta",
    description: "Creamy alfredo sauce with grilled chicken.",
    price: 270,
    image: "/customer-favorites/brownie.webp",
    mainCategory: "meals",
    mealType: "dinner",
    category: "pasta",
    isActive: true,
    createdAt: "2026-02-10",
    isFeatured: true,
    calories: 720,
    allergens: ["gluten", "milk"],
    tags: ["creamy"],
  },
];

interface MealsPageProps {
  searchParams: Promise<{ mealType: string; category: string }>;
}

export default async function MealsPage({ searchParams }: MealsPageProps) {
  const { mealType, category } = await searchParams;
  const Meal = mealType || "breakfast";
  const filteredCategories = mockMealsCategories.filter(
    (cat) => cat.mealType === Meal,
  );

  const selectedCategory = category || filteredCategories[0].slug;

  const filteredMeals = mockMeals.filter(
    (meal) => meal.mealType === Meal && meal.category === selectedCategory,
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
