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
      <div className="border border-stone-200 rounded-2xl shadow-md p-5 space-y-2">
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

          <div className="space-y-2">
            {/* TITLE */}
            <h1 className="font-bold text-2xl">{product.title}</h1>
            {/* PRICE */}
            {product.price > 0 && (
              <p className="font-bold text-green-600">${product.price}</p>
            )}
            {/* VARIANTS */}
            {product.variants.length > 0 && (
              <div className="flex flex-wrap gap-3 ">
                {product.variants.map((variant) => (
                  <div
                    key={variant.name}
                    className="flex items-center gap-1.5 border border-stone-200 rounded-lg px-2 py-1.5 "
                  >
                    <span className="text-sm text-muted-foreground">
                      {variant.name}
                    </span>
                    <span className="text-sm font-bold text-green-600">
                      ${variant.price}
                    </span>
                  </div>
                ))}
              </div>
            )}
            {/* DESC */}
            <p className="text-xs text-gray-600">{product.description}</p>
          </div>
        </div>
        <div className="space-y-3 pt-2 border-t border-stone-100">
          <p className="text-sm">
            <span className="font-bold">Category: </span>
            {product.category.label}
          </p>
          {product.calories != null && (
            <p className="text-sm">
              <span className="font-bold">Calories: </span>
              {product.calories} kcal
            </p>
          )}
          {product.allergens.length > 0 && (
            <div className="space-y-1">
              <p className="text-sm font-bold">Allergens:</p>
              <div className="flex flex-wrap gap-1.5">
                {product.allergens.map((allergen) => (
                  <span
                    key={allergen}
                    className="bg-red-100 text-red-700 text-xs font-medium px-2.5 py-1 rounded-full"
                  >
                    {allergen}
                  </span>
                ))}
              </div>
            </div>
          )}
          {product.tags.length > 0 && (
            <div className="space-y-1">
              <p className="text-sm font-bold">Tags:</p>
              <div className="flex flex-wrap gap-1.5">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-stone-800 text-white text-xs font-medium px-2.5 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
