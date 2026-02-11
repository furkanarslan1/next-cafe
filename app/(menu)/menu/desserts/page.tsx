import { DessertsCategoryType } from "@/types/menu/desserts/dessertsType";
import { ProductType } from "@/types/menu/MenuTypes";
import React, { Suspense } from "react";
import MenuCategories from "../_components/MenuCategories";
import MenuItems from "../_components/MenuItems";

export const mockDessertsCategories: DessertsCategoryType[] = [
  // ================= CAKE =================
  {
    id: 1,
    title: "Chocolate Cakes",
    slug: "chocolate-cake",
    dessertType: "cake",
  },
  {
    id: 2,
    title: "Cheesecakes",
    slug: "cheesecake",
    dessertType: "cake",
  },

  // ================= PASTRY =================
  {
    id: 3,
    title: "Croissants",
    slug: "croissant",
    dessertType: "pastry",
  },
  {
    id: 4,
    title: "Tarts",
    slug: "tart",
    dessertType: "pastry",
  },

  // ================= COOKIE =================
  {
    id: 5,
    title: "Classic Cookies",
    slug: "classic-cookie",
    dessertType: "cookie",
  },
  {
    id: 6,
    title: "Stuffed Cookies",
    slug: "stuffed-cookie",
    dessertType: "cookie",
  },

  // ================= ICE CREAM =================
  {
    id: 7,
    title: "Classic Scoops",
    slug: "classic-ice-cream",
    dessertType: "ice-cream",
  },
  {
    id: 8,
    title: "Sundaes",
    slug: "sundae",
    dessertType: "ice-cream",
  },

  // ================= SPECIAL =================
  {
    id: 9,
    title: "Signature Brownies",
    slug: "signature-brownie",
    dessertType: "special",
  },
  {
    id: 10,
    title: "Limited Edition",
    slug: "limited-edition",
    dessertType: "special",
  },
];

export const mockDessertProducts: ProductType[] = [
  // ================= CAKE =================
  {
    id: 101,
    slug: "chocolate-cake",
    title: "Chocolate Cake",
    description: "Rich and moist chocolate layered cake.",
    price: 140,
    image: "/customer-favorites/brownie.webp",
    mainCategory: "desserts",
    dessertType: "cake",
    category: "chocolate-cake",
    isActive: true,
    createdAt: "2026-02-11",
    isPopular: true,
    calories: 450,
    allergens: ["gluten", "milk", "egg"],
    tags: ["sweet"],
  },
  {
    id: 102,
    slug: "san-sebastian-cheesecake",
    title: "San Sebastian Cheesecake",
    description: "Creamy burnt cheesecake with soft center.",
    price: 160,
    image: "/customer-favorites/brownie.webp",
    mainCategory: "desserts",
    dessertType: "cake",
    category: "cheesecake",
    isActive: true,
    createdAt: "2026-02-11",
    isFeatured: true,
    calories: 520,
    allergens: ["milk", "egg"],
    tags: ["creamy"],
  },

  // ================= PASTRY =================
  {
    id: 103,
    slug: "butter-croissant",
    title: "Butter Croissant",
    description: "Flaky French-style butter croissant.",
    price: 90,
    image: "/customer-favorites/brownie.webp",
    mainCategory: "desserts",
    dessertType: "pastry",
    category: "croissant",
    isActive: true,
    createdAt: "2026-02-11",
    calories: 280,
    allergens: ["gluten", "milk"],
    tags: ["bakery"],
  },
  {
    id: 104,
    slug: "strawberry-tart",
    title: "Strawberry Tart",
    description: "Fresh strawberries over vanilla cream tart.",
    price: 130,
    image: "/customer-favorites/brownie.webp",
    mainCategory: "desserts",
    dessertType: "pastry",
    category: "tart",
    isActive: true,
    createdAt: "2026-02-11",
    isNew: true,
    calories: 340,
    allergens: ["gluten", "milk", "egg"],
    tags: ["fresh"],
  },

  // ================= COOKIE =================
  {
    id: 105,
    slug: "chocolate-chip-cookie",
    title: "Chocolate Chip Cookie",
    description: "Classic cookie with dark chocolate chips.",
    price: 60,
    image: "/customer-favorites/brownie.webp",
    mainCategory: "desserts",
    dessertType: "cookie",
    category: "classic-cookie",
    isActive: true,
    createdAt: "2026-02-11",
    isPopular: true,
    calories: 210,
    allergens: ["gluten", "milk", "egg"],
    tags: ["classic"],
  },

  // ================= ICE CREAM =================
  {
    id: 106,
    slug: "vanilla-ice-cream",
    title: "Vanilla Ice Cream",
    description: "Creamy vanilla bean ice cream scoop.",
    price: 80,
    image: "/customer-favorites/brownie.webp",
    mainCategory: "desserts",
    dessertType: "ice-cream",
    category: "classic-ice-cream",
    isActive: true,
    createdAt: "2026-02-11",
    calories: 190,
    allergens: ["milk"],
    tags: ["cold"],
  },

  // ================= SPECIAL =================
  {
    id: 107,
    slug: "lotus-brownie-special",
    title: "Lotus Brownie Special",
    description: "Warm brownie topped with lotus cream.",
    price: 170,
    image: "/customer-favorites/brownie.webp",
    mainCategory: "desserts",
    dessertType: "special",
    category: "signature-brownie",
    isActive: true,
    createdAt: "2026-02-11",
    isFeatured: true,
    isPopular: true,
    calories: 600,
    allergens: ["gluten", "milk", "egg"],
    tags: ["signature", "sweet"],
  },
];

interface DessertsPageProps {
  searchParams: Promise<{ category: string; dessertType: string }>;
}

export default async function DessertsPage({
  searchParams,
}: DessertsPageProps) {
  const { category, dessertType } = await searchParams;
  const selectedDessertType = dessertType || "cake";
  const filteredCategory = mockDessertsCategories.filter(
    (cat) => cat.dessertType === selectedDessertType,
  );
  const selectedCategory = category || filteredCategory[0].slug;
  const filteredDeserts = mockDessertProducts.filter(
    (dessert) =>
      dessert.category === selectedCategory &&
      dessert.dessertType === selectedDessertType,
  );
  return (
    <div className="  ">
      <Suspense fallback={<div className="h-20">Loading...</div>}>
        <MenuCategories
          selectedCategory={selectedCategory}
          categories={filteredCategory}
        />
      </Suspense>
      <MenuItems items={filteredDeserts} />
    </div>
  );
}
