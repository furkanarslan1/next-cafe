import { Suspense } from "react";
import { CategoryType, Product } from "@/types/menu/MenuTypes";
import MenuCategories from "../_components/MenuCategories";
import MenuItems from "../_components/MenuItems";

export const drinksCategoriesMock: CategoryType[] = [
  { id: "1", label: "Coffee", slug: "coffee", mainCategory: "drinks", subType: "hot", isActive: true, createdAt: "2025-01-01" },
  { id: "2", label: "Tea", slug: "tea", mainCategory: "drinks", subType: "hot", isActive: true, createdAt: "2025-01-01" },
  { id: "3", label: "Cold Drinks", slug: "cold-drinks", mainCategory: "drinks", subType: "cold", isActive: true, createdAt: "2025-01-01" },
  { id: "4", label: "Hot Drinks", slug: "hot-drinks", mainCategory: "drinks", subType: "hot", isActive: true, createdAt: "2025-01-01" },
  { id: "5", label: "Smoothies", slug: "smoothies", mainCategory: "drinks", subType: "cold", isActive: true, createdAt: "2025-01-01" },
  { id: "6", label: "Milkshakes", slug: "milkshakes", mainCategory: "drinks", subType: "cold", isActive: true, createdAt: "2025-01-01" },
  { id: "7", label: "Soft Drinks", slug: "soft-drinks", mainCategory: "drinks", subType: "hot", isActive: true, createdAt: "2025-01-01" },
  { id: "8", label: "Fresh Juices", slug: "fresh-juices", mainCategory: "drinks", subType: "cold", isActive: true, createdAt: "2025-01-01" },
  { id: "9", label: "Specialty Drinks", slug: "specialty-drinks", mainCategory: "drinks", subType: "hot", isActive: true, createdAt: "2025-01-01" },
];

export const drinksProductsMock: Product[] = [
  {
    id: "1",
    slug: "espresso",
    title: "Espresso",
    description: "Rich and bold espresso shot",
    price: 70,
    discountRate: 0,
    variants: [],
    imageUrl: "/customer-favorites/cappuccino.webp",
    categoryId: "1",
    isActive: true,
    isFeatured: false,
    isNew: false,
    isPopular: false,
    isOutOfStock: false,
    allergens: [],
    tags: [],
    createdAt: "2025-01-01",
  },
  {
    id: "2",
    slug: "americano",
    title: "Americano",
    description: "Espresso with hot water",
    price: 80,
    discountRate: 0,
    variants: [],
    imageUrl: "/customer-favorites/mocha.webp",
    categoryId: "1",
    isActive: true,
    isFeatured: false,
    isNew: false,
    isPopular: false,
    isOutOfStock: false,
    allergens: [],
    tags: [],
    createdAt: "2025-01-01",
  },
  {
    id: "3",
    slug: "mocha",
    title: "Mocha",
    description: "Mocha with steamed milk",
    price: 95,
    discountRate: 0,
    variants: [],
    imageUrl: "/customer-favorites/mocha.webp",
    categoryId: "1",
    isActive: true,
    isFeatured: false,
    isNew: false,
    isPopular: false,
    isOutOfStock: false,
    allergens: [],
    tags: [],
    createdAt: "2025-01-01",
  },
  {
    id: "4",
    slug: "iced-mocha",
    title: "Iced Mocha",
    description: "Chilled mocha with milk",
    price: 100,
    discountRate: 0,
    variants: [],
    imageUrl: "/customer-favorites/mocha.webp",
    categoryId: "3",
    isActive: true,
    isFeatured: false,
    isNew: false,
    isPopular: false,
    isOutOfStock: false,
    allergens: [],
    tags: [],
    createdAt: "2025-01-01",
  },
  {
    id: "5",
    slug: "cold-brew",
    title: "Cold Brew",
    description: "Slow brewed cold coffee",
    price: 110,
    discountRate: 0,
    variants: [],
    imageUrl: "/customer-favorites/mocha.webp",
    categoryId: "3",
    isActive: true,
    isFeatured: false,
    isNew: false,
    isPopular: false,
    isOutOfStock: false,
    allergens: [],
    tags: [],
    createdAt: "2025-01-01",
  },
  {
    id: "6",
    slug: "black-tea",
    title: "Black Tea",
    description: "Classic brewed black tea",
    price: 60,
    discountRate: 0,
    variants: [],
    imageUrl: "/customer-favorites/mocha.webp",
    categoryId: "2",
    isActive: true,
    isFeatured: false,
    isNew: false,
    isPopular: false,
    isOutOfStock: false,
    allergens: [],
    tags: [],
    createdAt: "2025-01-01",
  },
  {
    id: "7",
    slug: "green-tea",
    title: "Green Tea",
    description: "Light and refreshing green tea",
    price: 65,
    discountRate: 0,
    variants: [],
    imageUrl: "/customer-favorites/mocha.webp",
    categoryId: "2",
    isActive: true,
    isFeatured: false,
    isNew: false,
    isPopular: false,
    isOutOfStock: false,
    allergens: [],
    tags: [],
    createdAt: "2025-01-01",
  },
  {
    id: "8",
    slug: "iced-tea",
    title: "Iced Tea",
    description: "Freshly brewed iced tea",
    price: 75,
    discountRate: 0,
    variants: [],
    imageUrl: "/customer-favorites/mocha.webp",
    categoryId: "2",
    isActive: true,
    isFeatured: false,
    isNew: false,
    isPopular: false,
    isOutOfStock: false,
    allergens: [],
    tags: [],
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
  const selectedCategory = category || filteredCategories[0]?.id || "";

  const filteredDrinks = drinksProductsMock.filter(
    (drink) => drink.categoryId === selectedCategory,
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