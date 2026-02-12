import { Suspense } from "react";
import { CategoryType, DrinkProduct } from "@/types/menu/MenuTypes";
import MenuCategories from "../_components/MenuCategories";
import MenuItems from "../_components/MenuItems";

export const drinksCategoriesMock: CategoryType[] = [
  { id: "1", title: "Coffee", slug: "coffee", mainCategory: "drinks", subType: "hot" },
  { id: "2", title: "Tea", slug: "tea", mainCategory: "drinks", subType: "hot" },
  { id: "3", title: "Cold Drinks", slug: "cold-drinks", mainCategory: "drinks", subType: "cold" },
  { id: "4", title: "Hot Drinks", slug: "hot-drinks", mainCategory: "drinks", subType: "hot" },
  { id: "5", title: "Smoothies", slug: "smoothies", mainCategory: "drinks", subType: "cold" },
  { id: "6", title: "Milkshakes", slug: "milkshakes", mainCategory: "drinks", subType: "cold" },
  { id: "7", title: "Soft Drinks", slug: "soft-drinks", mainCategory: "drinks", subType: "hot" },
  { id: "8", title: "Fresh Juices", slug: "fresh-juices", mainCategory: "drinks", subType: "cold" },
  { id: "9", title: "Specialty Drinks", slug: "specialty-drinks", mainCategory: "drinks", subType: "hot" },
];

export const drinksProductsMock: DrinkProduct[] = [
  {
    id: "1",
    slug: "espresso",
    title: "Espresso",
    description: "Rich and bold espresso shot",
    basePrice: 70,
    image: "/customer-favorites/cappuccino.webp",
    mainCategory: "drinks",
    temperature: "hot",
    categoryId: "coffee",
    isActive: true,
    createdAt: "2025-01-01",
  },
  {
    id: "2",
    slug: "americano",
    title: "Americano",
    description: "Espresso with hot water",
    basePrice: 80,
    image: "/customer-favorites/mocha.webp",
    mainCategory: "drinks",
    temperature: "hot",
    categoryId: "coffee",
    isActive: true,
    createdAt: "2025-01-01",
  },
  {
    id: "3",
    slug: "mocha",
    title: "Mocha",
    description: "Mocha with steamed milk",
    basePrice: 95,
    image: "/customer-favorites/mocha.webp",
    mainCategory: "drinks",
    temperature: "hot",
    categoryId: "coffee",
    isActive: true,
    createdAt: "2025-01-01",
  },
  {
    id: "4",
    slug: "iced-mocha",
    title: "Iced Mocha",
    description: "Chilled mocha with milk",
    basePrice: 100,
    image: "/customer-favorites/mocha.webp",
    mainCategory: "drinks",
    temperature: "cold",
    categoryId: "coffee",
    isActive: true,
    createdAt: "2025-01-01",
  },
  {
    id: "5",
    slug: "cold-brew",
    title: "Cold Brew",
    description: "Slow brewed cold coffee",
    basePrice: 110,
    image: "/customer-favorites/mocha.webp",
    mainCategory: "drinks",
    temperature: "cold",
    categoryId: "coffee",
    isActive: true,
    createdAt: "2025-01-01",
  },
  {
    id: "6",
    slug: "black-tea",
    title: "Black Tea",
    description: "Classic brewed black tea",
    basePrice: 60,
    image: "/customer-favorites/mocha.webp",
    mainCategory: "drinks",
    temperature: "hot",
    categoryId: "tea",
    isActive: true,
    createdAt: "2025-01-01",
  },
  {
    id: "7",
    slug: "green-tea",
    title: "Green Tea",
    description: "Light and refreshing green tea",
    basePrice: 65,
    image: "/customer-favorites/mocha.webp",
    mainCategory: "drinks",
    temperature: "hot",
    categoryId: "tea",
    isActive: true,
    createdAt: "2025-01-01",
  },
  {
    id: "8",
    slug: "iced-tea",
    title: "Iced Tea",
    description: "Freshly brewed iced tea",
    basePrice: 75,
    image: "/customer-favorites/mocha.webp",
    mainCategory: "drinks",
    temperature: "cold",
    categoryId: "tea",
    isActive: true,
    createdAt: "2025-01-01",
  },
];

interface DrinkPageProps {
  searchParams: Promise<{ drinkTemperature: string; category: string }>;
}

export default async function DrinksPage({ searchParams }: DrinkPageProps) {
  const { drinkTemperature, category } = await searchParams;
  const temperature = drinkTemperature || "hot";

  const filteredCategories = drinksCategoriesMock.filter(
    (cat) => cat.subType === temperature,
  );
  const selectedCategory = category || filteredCategories[0]?.slug || "";

  const filteredDrinks = drinksProductsMock.filter(
    (drink) =>
      drink.temperature === temperature &&
      drink.categoryId === selectedCategory,
  );
  return (
    <div>
      <Suspense fallback={<div className="h-20">Loading...</div>}>
        <MenuCategories
          selectedCategory={selectedCategory}
          categories={filteredCategories}
        />
      </Suspense>
      <MenuItems items={filteredDrinks} />
    </div>
  );
}
