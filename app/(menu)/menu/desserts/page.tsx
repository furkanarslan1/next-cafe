import { CategoryType, DessertProduct } from "@/types/menu/MenuTypes";
import React, { Suspense } from "react";
import MenuCategories from "../_components/MenuCategories";
import MenuItems from "../_components/MenuItems";

export const mockDessertsCategories: CategoryType[] = [
  // ================= CAKE =================
  {
    id: "1",
    title: "Chocolate Cakes",
    slug: "chocolate-cake",
    mainCategory: "desserts",
    subType: "cake",
  },
  {
    id: "2",
    title: "Cheesecakes",
    slug: "cheesecake",
    mainCategory: "desserts",
    subType: "cake",
  },

  // ================= PASTRY =================
  {
    id: "3",
    title: "Croissants",
    slug: "croissant",
    mainCategory: "desserts",
    subType: "pastry",
  },
  {
    id: "4",
    title: "Tarts",
    slug: "tart",
    mainCategory: "desserts",
    subType: "pastry",
  },

  // ================= COOKIE =================
  {
    id: "5",
    title: "Classic Cookies",
    slug: "classic-cookie",
    mainCategory: "desserts",
    subType: "cookie",
  },
  {
    id: "6",
    title: "Stuffed Cookies",
    slug: "stuffed-cookie",
    mainCategory: "desserts",
    subType: "cookie",
  },

  // ================= ICE CREAM =================
  {
    id: "7",
    title: "Classic Scoops",
    slug: "classic-ice-cream",
    mainCategory: "desserts",
    subType: "ice-cream",
  },
  {
    id: "8",
    title: "Sundaes",
    slug: "sundae",
    mainCategory: "desserts",
    subType: "ice-cream",
  },

  // ================= SPECIAL =================
  {
    id: "9",
    title: "Signature Brownies",
    slug: "signature-brownie",
    mainCategory: "desserts",
    subType: "special",
  },
  {
    id: "10",
    title: "Limited Edition",
    slug: "limited-edition",
    mainCategory: "desserts",
    subType: "special",
  },
];

export const mockDessertProducts: DessertProduct[] = [
  // ================= CAKE =================
  {
    id: "101",
    slug: "chocolate-cake",
    title: "Chocolate Cake",
    description: "Rich and moist chocolate layered cake.",
    basePrice: 140,
    image: "/customer-favorites/brownie.webp",
    mainCategory: "desserts",
    dessertType: "cake",
    categoryId: "chocolate-cake",
    isActive: true,
    createdAt: "2026-02-11",
    isPopular: true,
    calories: 450,
    allergens: ["gluten", "milk", "egg"],
    tags: ["sweet"],
  },
  {
    id: "102",
    slug: "san-sebastian-cheesecake",
    title: "San Sebastian Cheesecake",
    description: "Creamy burnt cheesecake with soft center.",
    basePrice: 160,
    image: "/customer-favorites/brownie.webp",
    mainCategory: "desserts",
    dessertType: "cake",
    categoryId: "cheesecake",
    isActive: true,
    createdAt: "2026-02-11",
    isFeatured: true,
    calories: 520,
    allergens: ["milk", "egg"],
    tags: ["creamy"],
  },

  // ================= PASTRY =================
  {
    id: "103",
    slug: "butter-croissant",
    title: "Butter Croissant",
    description: "Flaky French-style butter croissant.",
    basePrice: 90,
    image: "/customer-favorites/brownie.webp",
    mainCategory: "desserts",
    dessertType: "pastry",
    categoryId: "croissant",
    isActive: true,
    createdAt: "2026-02-11",
    calories: 280,
    allergens: ["gluten", "milk"],
    tags: ["bakery"],
  },
  {
    id: "104",
    slug: "strawberry-tart",
    title: "Strawberry Tart",
    description: "Fresh strawberries over vanilla cream tart.",
    basePrice: 130,
    image: "/customer-favorites/brownie.webp",
    mainCategory: "desserts",
    dessertType: "pastry",
    categoryId: "tart",
    isActive: true,
    createdAt: "2026-02-11",
    isNew: true,
    calories: 340,
    allergens: ["gluten", "milk", "egg"],
    tags: ["fresh"],
  },

  // ================= COOKIE =================
  {
    id: "105",
    slug: "chocolate-chip-cookie",
    title: "Chocolate Chip Cookie",
    description: "Classic cookie with dark chocolate chips.",
    basePrice: 60,
    image: "/customer-favorites/brownie.webp",
    mainCategory: "desserts",
    dessertType: "cookie",
    categoryId: "classic-cookie",
    isActive: true,
    createdAt: "2026-02-11",
    isPopular: true,
    calories: 210,
    allergens: ["gluten", "milk", "egg"],
    tags: ["classic"],
  },

  // ================= ICE CREAM =================
  {
    id: "106",
    slug: "vanilla-ice-cream",
    title: "Vanilla Ice Cream",
    description: "Creamy vanilla bean ice cream scoop.",
    basePrice: 80,
    image: "/customer-favorites/brownie.webp",
    mainCategory: "desserts",
    dessertType: "ice-cream",
    categoryId: "classic-ice-cream",
    isActive: true,
    createdAt: "2026-02-11",
    calories: 190,
    allergens: ["milk"],
    tags: ["cold"],
  },

  // ================= SPECIAL =================
  {
    id: "107",
    slug: "lotus-brownie-special",
    title: "Lotus Brownie Special",
    description: "Warm brownie topped with lotus cream.",
    basePrice: 170,
    image: "/customer-favorites/brownie.webp",
    mainCategory: "desserts",
    dessertType: "special",
    categoryId: "signature-brownie",
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
    (cat) => cat.subType === selectedDessertType,
  );
  const selectedCategory = category || filteredCategory[0]?.slug || "";
  const filteredDeserts = mockDessertProducts.filter(
    (dessert) =>
      dessert.categoryId === selectedCategory &&
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
