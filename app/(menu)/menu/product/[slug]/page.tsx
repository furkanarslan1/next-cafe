import { getProductBySlug } from "@/app/(actions)/product/getProductBySlug";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";

interface ProductDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();
  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <div className="relative h-[40vh] w-full">
        <Image
          src={product.imageUrl || "/next-cafe-hero.webp"}
          alt={product.title}
          fill
          className="object-contain"
        />
      </div>
      <div className="space-y-2">
        <div className="space-y-4">
          {/* BADGES */}
          <div className="flex gap-2">
            {product.isPopular && (
              <span className="bg-orange-100 text-orange-700 text-xs font-medium px-2.5 py-1 rounded-full">
                Popular
              </span>
            )}
            {product.isNew && (
              <span className="bg-green-100 text-green-700 text-xs font-medium px-2.5 py-1 rounded-full">
                New
              </span>
            )}
            {product.isFeatured && (
              <span className="bg-purple-100 text-purple-700 text-xs font-medium px-2.5 py-1 rounded-full">
                Featured
              </span>
            )}
          </div>

          <div className="spacey-2">
            {/* TITLE */}
            <h1 className="font-bold text-2xl ">{product.title}</h1>
            {/* PRICE */}
            <p className="font-bold text-green-600">${product.price}</p>
            {/* DESC */}
            <p className="text-xs">{product.description}</p>
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-sm  ">
            <span className="font-bold">Category: </span>
            {product.category.label}
          </p>
          <p className="text-sm">
            <span className="font-bold">Calories:</span> {product.calories}
          </p>
          {/* Allergens */}
          <div className="text-sm flex items-center gap-2">
            <span className="font-bold">Allergens:</span>
            <div className="flex flex-wrap gap-2 mt-1">
              {product.allergens?.map((allergen, i) => (
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
              {product.tags?.map((tag, i) => (
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
