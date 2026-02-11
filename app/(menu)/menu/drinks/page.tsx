import { DrinksCategoryType } from "@/types/menu/drinks/drinksType";

import { Suspense } from "react";
import { ProductType } from "@/types/menu/MenuTypes";
import MenuCategories from "../_components/MenuCategories";
import MenuItems from "../_components/MenuItems";

export const drinksCategoriesMock: DrinksCategoryType[] = [
  { id: 1, title: "Coffee", slug: "coffee", drinkTemperature: "hot" },
  { id: 2, title: "Tea", slug: "tea", drinkTemperature: "hot" },
  {
    id: 3,
    title: "Cold Drinks",
    slug: "cold-drinks",
    drinkTemperature: "cold",
  },
  { id: 4, title: "Hot Drinks", slug: "hot-drinks", drinkTemperature: "hot" },
  { id: 5, title: "Smoothies", slug: "smoothies", drinkTemperature: "cold" },
  { id: 6, title: "Milkshakes", slug: "milkshakes", drinkTemperature: "cold" },
  { id: 7, title: "Soft Drinks", slug: "soft-drinks", drinkTemperature: "hot" },
  {
    id: 8,
    title: "Fresh Juices",
    slug: "fresh-juices",
    drinkTemperature: "cold",
  },
  {
    id: 9,
    title: "Specialty Drinks",
    slug: "specialty-drinks",
    drinkTemperature: "hot",
  },
];

export const drinksProductsMock: ProductType[] = [
  {
    id: 1,
    slug: "espresso",
    title: "Espresso",
    description: "Rich and bold espresso shot",
    price: 70,
    image: "/customer-favorites/cappuccino.webp",
    mainCategory: "drinks",
    drinkTemperature: "hot",
    category: "coffee",
    isActive: true,
    createdAt: "2025-01-01",
    displayOrder: 1,
  },
  {
    id: 2,
    slug: "americano",
    title: "Americano",
    description: "Espresso with hot water",
    price: 80,
    image: "/customer-favorites/mocha.webp",
    mainCategory: "drinks",
    drinkTemperature: "hot",
    category: "coffee",
    isActive: true,
    createdAt: "2025-01-01",
    displayOrder: 2,
  },
  {
    id: 3,
    slug: "mocha",
    title: "mocha",
    description: "mocha with steamed milk",
    price: 95,
    image: "/customer-favorites/mocha.webp",
    mainCategory: "drinks",
    drinkTemperature: "hot",
    category: "coffee",
    isActive: true,
    createdAt: "2025-01-01",
    displayOrder: 3,
  },
  {
    id: 4,
    slug: "iced-mocha",
    title: "Iced mocha",
    description: "Chilled mocha with milk",
    price: 100,
    image: "/customer-favorites/mocha.webp",
    mainCategory: "drinks",
    drinkTemperature: "cold",
    category: "coffee",
    isActive: true,
    createdAt: "2025-01-01",
    displayOrder: 4,
  },
  {
    id: 5,
    slug: "cold-brew",
    title: "Cold Brew",
    description: "Slow brewed cold coffee",
    price: 110,
    image: "/customer-favorites/mocha.webp",
    mainCategory: "drinks",
    drinkTemperature: "cold",
    category: "coffee",
    isActive: true,
    createdAt: "2025-01-01",
    displayOrder: 5,
  },
  {
    id: 6,
    slug: "black-tea",
    title: "Black Tea",
    description: "Classic brewed black tea",
    price: 60,
    image: "/customer-favorites/mocha.webp",
    mainCategory: "drinks",
    drinkTemperature: "hot",
    category: "tea",
    isActive: true,
    createdAt: "2025-01-01",
    displayOrder: 6,
  },
  {
    id: 7,
    slug: "green-tea",
    title: "Green Tea",
    description: "Light and refreshing green tea",
    price: 65,
    image: "/customer-favorites/mocha.webp",
    mainCategory: "drinks",
    drinkTemperature: "hot",
    category: "tea",
    isActive: true,
    createdAt: "2025-01-01",
    displayOrder: 7,
  },
  {
    id: 8,
    slug: "iced-tea",
    title: "Iced Tea",
    description: "Freshly brewed iced tea",
    price: 75,
    image: "/customer-favorites/mocha.webp",
    mainCategory: "drinks",
    drinkTemperature: "cold",
    category: "tea",
    isActive: true,
    createdAt: "2025-01-01",
    displayOrder: 8,
  },
];

interface DrinkPageProps {
  searchParams: Promise<{ drinkTemperature: string; category: string }>;
}

export default async function DrinksPage({ searchParams }: DrinkPageProps) {
  const { drinkTemperature, category } = await searchParams;
  const temperature = drinkTemperature || "hot";

  const filteredCategories = drinksCategoriesMock.filter(
    (cat) => cat.drinkTemperature === temperature,
  );
  const selectedCategory = category || filteredCategories[0].slug;

  const filteredDrinks = drinksProductsMock.filter(
    (drink) =>
      drink.drinkTemperature === temperature &&
      drink.category === selectedCategory,
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
