import {
  DrinkProductType,
  DrinksCategoryType,
} from "@/types/menu/drinks/drinksType";
import DrinkItems from "./_components/DrinkItems";
import DrinksCategories from "./_components/DrinksCategories";

export const drinksCategoriesMock: DrinksCategoryType[] = [
  { id: 1, title: "Coffee", slug: "coffee" },
  { id: 2, title: "Tea", slug: "tea" },
  { id: 3, title: "Cold Drinks", slug: "cold-drinks" },
  { id: 4, title: "Hot Drinks", slug: "hot-drinks" },
  { id: 5, title: "Smoothies", slug: "smoothies" },
  { id: 6, title: "Milkshakes", slug: "milkshakes" },
  { id: 7, title: "Soft Drinks", slug: "soft-drinks" },
  { id: 8, title: "Fresh Juices", slug: "fresh-juices" },
  { id: 9, title: "Specialty Drinks", slug: "specialty-drinks" },
];

export const drinksProductsMock: DrinkProductType[] = [
  {
    id: 1,
    slug: "mocha",
    title: "mocha",
    description: "Rich and bold mocha shot",
    price: 70,
    image: "/customer-favorites/cappuccino.webp",
    mainCategory: "drinks",
    drinkTemperature: "hot",
    drinkType: "coffee",
    isActive: true,
    createdAt: "2025-01-01",
    displayOrder: 1,
  },
  {
    id: 2,
    slug: "mocha",
    title: "mocha",
    description: "mocha with hot water",
    price: 80,
    image: "/customer-favorites/mocha.webp",
    mainCategory: "drinks",
    drinkTemperature: "hot",
    drinkType: "coffee",
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
    drinkType: "coffee",
    isActive: true,
    createdAt: "2025-01-01",
    displayOrder: 3,
  },
  {
    id: 4,
    slug: "mocha",
    title: "Iced mocha",
    description: "Chilled mocha with milk",
    price: 100,
    image: "/customer-favorites/mocha.webp",
    mainCategory: "drinks",
    drinkTemperature: "cold",
    drinkType: "coffee",
    isActive: true,
    createdAt: "2025-01-01",
    displayOrder: 4,
  },
  {
    id: 5,
    slug: "mocha",
    title: "Cold Brew",
    description: "Slow brewed cold coffee",
    price: 110,
    image: "/customer-favorites/mocha.webp",
    mainCategory: "drinks",
    drinkTemperature: "cold",
    drinkType: "coffee",
    isActive: true,
    createdAt: "2025-01-01",
    displayOrder: 5,
  },
  {
    id: 6,
    slug: "mocha",
    title: "Black Tea",
    description: "Classic brewed black tea",
    price: 60,
    image: "/customer-favorites/mocha.webp",
    mainCategory: "drinks",
    drinkTemperature: "hot",
    drinkType: "tea",
    isActive: true,
    createdAt: "2025-01-01",
    displayOrder: 6,
  },
  {
    id: 7,
    slug: "mocha",
    title: "Green Tea",
    description: "Light and refreshing green tea",
    price: 65,
    image: "/customer-favorites/mocha.webp",
    mainCategory: "drinks",
    drinkTemperature: "hot",
    drinkType: "tea",
    isActive: true,
    createdAt: "2025-01-01",
    displayOrder: 7,
  },
  {
    id: 8,
    slug: "mocha",
    title: "Iced Tea",
    description: "Freshly brewed iced tea",
    price: 75,
    image: "/customer-favorites/mocha.webp",
    mainCategory: "drinks",
    drinkTemperature: "cold",
    drinkType: "tea",
    isActive: true,
    createdAt: "2025-01-01",
    displayOrder: 8,
  },
];

export default async function DrinksPage() {
  return (
    <div>
      <div className="h-16 w-full bg-stone-800 text-white"></div>
      <DrinksCategories categories={drinksCategoriesMock} />
      <DrinkItems drinks={drinksProductsMock} />
    </div>
  );
}
