export const revalidate = 518400; // 6 days — keeps Supabase active, revalidated on admin actions via revalidatePath

import { getProductBySlug } from "@/app/(actions)/product/getProductBySlug";
import Image from "next/image";
import { notFound } from "next/navigation";
import { BLUR_PLACEHOLDER } from "@/lib/blur-placeholder";


function applyDiscount(price: number, rate: number) {
  if (rate <= 0) return null;
  return Math.round(price * (1 - rate / 100) * 100) / 100;
}

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
          priority
          sizes="(max-width: 896px) 100vw, 896px"
          placeholder="blur"
          blurDataURL={BLUR_PLACEHOLDER}
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
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="font-bold text-2xl">{product.title}</h1>
              {product.isOutOfStock && (
                <span className="text-xs bg-red-100 text-red-600 px-2.5 py-1 rounded-full font-medium">
                  Sold out
                </span>
              )}
            </div>
            {/* PRICE */}
            {product.price > 0 && (() => {
              const discounted = applyDiscount(product.price, product.discountRate);
              return discounted ? (
                <div className="flex items-center gap-2">
                  <span className="text-sm line-through text-gray-400">${product.price}</span>
                  <span className="font-bold text-green-600 text-lg">${discounted}</span>
                  <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full font-medium">
                    -{product.discountRate}%
                  </span>
                </div>
              ) : (
                <p className="font-bold text-green-600">${product.price}</p>
              );
            })()}
            {/* VARIANTS */}
            {product.variants.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {product.variants.map((variant) => {
                  const discounted = applyDiscount(variant.price, product.discountRate);
                  return (
                    <div
                      key={variant.name}
                      className="flex items-center gap-1.5 border border-stone-200 rounded-lg px-2 py-1.5"
                    >
                      <span className="text-sm text-muted-foreground">
                        {variant.name}
                      </span>
                      {discounted ? (
                        <>
                          <span className="text-xs line-through text-gray-400">${variant.price}</span>
                          <span className="text-sm font-bold text-green-600">${discounted}</span>
                        </>
                      ) : (
                        <span className="text-sm font-bold text-green-600">${variant.price}</span>
                      )}
                    </div>
                  );
                })}
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
