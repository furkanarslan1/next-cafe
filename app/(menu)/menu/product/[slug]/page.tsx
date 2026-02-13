import { Product } from "@/types/menu/MenuTypes";
import Image from "next/image";
import React from "react";

interface ProductDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const mockProduct: Product = {
  id: "201",
  slug: "hot-latte",
  title: "Hot Latte",
  description: "Smooth espresso blended with steamed milk and light foam.",
  price: 120,
  discountRate: 0,
  variants: [],
  imageUrl: "/customer-favorites/brownie.webp",
  categoryId: "1",
  isActive: true,
  isFeatured: true,
  isNew: true,
  isPopular: true,
  isOutOfStock: false,
  calories: 180,
  allergens: ["milk", "egg", "gluten", "nuts", "soy"],
  tags: ["coffee", "classic"],
  createdAt: "2026-02-11",
};

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { slug } = await params;
  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="relative h-[40vh] w-full">
        <Image
          src={mockProduct.imageUrl || "/next-cafe-hero.webp"}
          alt={mockProduct.title}
          fill
          className="object-contain"
        />
      </div>
      <div className="space-y-2">
        <div className="space-y-1">
          {/* BADGES */}
          <div className="flex gap-2">
            {mockProduct.isPopular && (
              <span className="bg-orange-100 text-orange-700 text-xs font-medium px-2.5 py-1 rounded-full">
                Popular
              </span>
            )}
            {mockProduct.isNew && (
              <span className="bg-green-100 text-green-700 text-xs font-medium px-2.5 py-1 rounded-full">
                New
              </span>
            )}
            {mockProduct.isFeatured && (
              <span className="bg-purple-100 text-purple-700 text-xs font-medium px-2.5 py-1 rounded-full">
                Featured
              </span>
            )}
          </div>

          <div className="spacey-1">
            {/* TITLE */}
            <h1 className="font-bold text-2xl ">{mockProduct.title}</h1>
            {/* PRICE */}
            <p className="font-bold text-green-600">
              ${mockProduct.price}
            </p>
            {/* DESC */}
            <p className="text-sm">{mockProduct.description}</p>
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-sm  ">
            <span className="font-bold">Category: </span>
            {mockProduct.categoryId}
          </p>
          <p className="text-sm">
            <span className="font-bold">Calories:</span>{" "}
            {mockProduct.calories}
          </p>
          {/* Allergens */}
          <div className="text-sm flex items-center gap-2">
            <span className="font-bold">Allergens:</span>
            <div className="flex flex-wrap gap-2 mt-1">
              {mockProduct.allergens?.map((allergen, i) => (
                <span
                  key={i}
                  className="bg-red-100 text-red-700 text-xs font-medium px-2.5 py-1 rounded-full"
                >
                  {allergen}
                </span>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="text-sm flex items-center gap-2">
            <span className="font-bold">Tags:</span>
            <div className="flex flex-wrap gap-2 mt-1">
              {mockProduct.tags?.map((tag, i) => (
                <span
                  key={i}
                  className="bg-stone-800 text-white text-xs font-medium px-2.5 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}