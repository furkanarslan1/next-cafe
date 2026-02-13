import { CategoryType, Product } from "@/types/menu/MenuTypes";
import React, { Suspense } from "react";
import MenuCategories from "../_components/MenuCategories";
import MenuItems from "../_components/MenuItems";

export const mockDessertsCategories: CategoryType[] = [
  // ================= CAKE =================
  { id: "1", label: "Chocolate Cakes", slug: "chocolate-cake", mainCategory: "desserts", subType: "cake", isActive: true, createdAt: "2026-02-11" },
  { id: "2", label: "Cheesecakes", slug: "cheesecake", mainCategory: "desserts", subType: "cake", isActive: true, createdAt: "2026-02-11" },
  // ================= PASTRY =================
  { id: "3", label: "Croissants", slug: "croissant", mainCategory: "desserts", subType: "pastry", isActive: true, createdAt: "2026-02-11" },
  { id: "4", label: "Tarts", slug: "tart", mainCategory: "desserts", subType: "pastry", isActive: true, createdAt: "2026-02-11" },
  // ================= COOKIE =================
  { id: "5", label: "Classic Cookies", slug: "classic-cookie", mainCategory: "desserts", subType: "cookie", isActive: true, createdAt: "2026-02-11" },
  { id: "6", label: "Stuffed Cookies", slug: "stuffed-cookie", mainCategory: "desserts", subType: "cookie", isActive: true, createdAt: "2026-02-11" },
  // ================= ICE CREAM =================
  { id: "7", label: "Classic Scoops", slug: "classic-ice-cream", mainCategory: "desserts", subType: "ice-cream", isActive: true, createdAt: "2026-02-11" },
  { id: "8", label: "Sundaes", slug: "sundae", mainCategory: "desserts", subType: "ice-cream", isActive: true, createdAt: "2026-02-11" },
  // ================= SPECIAL =================
  { id: "9", label: "Signature Brownies", slug: "signature-brownie", mainCategory: "desserts", subType: "special", isActive: true, createdAt: "2026-02-11" },
  { id: "10", label: "Limited Edition", slug: "limited-edition", mainCategory: "desserts", subType: "special", isActive: true, createdAt: "2026-02-11" },
];

export const mockDessertProducts: Product[] = [
  // ================= CAKE =================
  {
    id: "101",
    slug: "chocolate-cake",
    title: "Chocolate Cake",
    description: "Rich and moist chocolate layered cake.",
    price: 140,
    discountRate: 0,
    variants: [],
    imageUrl: "/customer-favorites/brownie.webp",
    categoryId: "1",
    isActive: true,
    isFeatured: false,
    isNew: false,
    isPopular: true,
    isOutOfStock: false,
    calories: 450,
    allergens: ["gluten", "milk", "egg"],
    tags: ["sweet"],
    createdAt: "2026-02-11",
  },
  {
    id: "102",
    slug: "san-sebastian-cheesecake",
    title: "San Sebastian Cheesecake",
    description: "Creamy burnt cheesecake with soft center.",
    price: 160,
    discountRate: 0,
    variants: [],
    imageUrl: "/customer-favorites/brownie.webp",
    categoryId: "2",
    isActive: true,
    isFeatured: true,
    isNew: false,
    isPopular: false,
    isOutOfStock: false,
    calories: 520,
    allergens: ["milk", "egg"],
    tags: ["creamy"],
    createdAt: "2026-02-11",
  },
  // ================= PASTRY =================
  {
    id: "103",
    slug: "butter-croissant",
    title: "Butter Croissant",
    description: "Flaky French-style butter croissant.",
    price: 90,
    discountRate: 0,
    variants: [],
    imageUrl: "/customer-favorites/brownie.webp",
    categoryId: "3",
    isActive: true,
    isFeatured: false,
    isNew: false,
    isPopular: false,
    isOutOfStock: false,
    calories: 280,
    allergens: ["gluten", "milk"],
    tags: ["bakery"],
    createdAt: "2026-02-11",
  },
  {
    id: "104",
    slug: "strawberry-tart",
    title: "Strawberry Tart",
    description: "Fresh strawberries over vanilla cream tart.",
    price: 130,
    discountRate: 0,
    variants: [],
    imageUrl: "/customer-favorites/brownie.webp",
    categoryId: "4",
    isActive: true,
    isFeatured: false,
    isNew: true,
    isPopular: false,
    isOutOfStock: false,
    calories: 340,
    allergens: ["gluten", "milk", "egg"],
    tags: ["fresh"],
    createdAt: "2026-02-11",
  },
  // ================= COOKIE =================
  {
    id: "105",
    slug: "chocolate-chip-cookie",
    title: "Chocolate Chip Cookie",
    description: "Classic cookie with dark chocolate chips.",
    price: 60,
    discountRate: 0,
    variants: [],
    imageUrl: "/customer-favorites/brownie.webp",
    categoryId: "5",
    isActive: true,
    isFeatured: false,
    isNew: false,
    isPopular: true,
    isOutOfStock: false,
    calories: 210,
    allergens: ["gluten", "milk", "egg"],
    tags: ["classic"],
    createdAt: "2026-02-11",
  },
  // ================= ICE CREAM =================
  {
    id: "106",
    slug: "vanilla-ice-cream",
    title: "Vanilla Ice Cream",
    description: "Creamy vanilla bean ice cream scoop.",
    price: 80,
    discountRate: 0,
    variants: [],
    imageUrl: "/customer-favorites/brownie.webp",
    categoryId: "7",
    isActive: true,
    isFeatured: false,
    isNew: false,
    isPopular: false,
    isOutOfStock: false,
    calories: 190,
    allergens: ["milk"],
    tags: ["cold"],
    createdAt: "2026-02-11",
  },
  // ================= SPECIAL =================
  {
    id: "107",
    slug: "lotus-brownie-special",
    title: "Lotus Brownie Special",
    description: "Warm brownie topped with lotus cream.",
    price: 170,
    discountRate: 0,
    variants: [],
    imageUrl: "/customer-favorites/brownie.webp",
    categoryId: "9",
    isActive: true,
    isFeatured: true,
    isNew: false,
    isPopular: true,
    isOutOfStock: false,
    calories: 600,
    allergens: ["gluten", "milk", "egg"],
    tags: ["signature", "sweet"],
    createdAt: "2026-02-11",
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
  const selectedCategory = category || filteredCategory[0]?.id || "";
  const filteredDeserts = mockDessertProducts.filter(
    (dessert) => dessert.categoryId === selectedCategory,
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