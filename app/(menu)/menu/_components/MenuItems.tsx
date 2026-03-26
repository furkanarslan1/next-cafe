import { Badge } from "@/components/ui/badge";
import { Product } from "@/types/menu/MenuTypes";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface MenuItemsProps {
  items: Product[];
}

function applyDiscount(price: number, rate: number) {
  if (rate <= 0) return null;
  return Math.round(price * (1 - rate / 100) * 100) / 100;
}

export default function MenuItems({ items }: MenuItemsProps) {
  return (
    <div className="text-xs md:sm p-4 max-w-5xl mx-auto">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-center gap-2 border-b border-stone-200"
        >
          {/*  IMAGE */}

          <Link
            href={`/menu/product/${item.slug}`}
            className="relative h-20 w-20 shrink-0"
          >
            <Image
              src={item.imageUrl || "/customer-favorites/brownie.webp"}
              alt={item.title || "drink-image"}
              fill
              className="object-contain"
            />
          </Link>
          {/*  TITLE & PRICE */}
          <div className="flex flex-col flex-1">
            <div className="flex items-center justify-between w-full">
              <p className="font-bold">{item.title}</p>
              {item.price > 0 && (() => {
                const discounted = applyDiscount(item.price, item.discountRate);
                return discounted ? (
                  <span className="flex items-center gap-1">
                    <span className="text-[10px] line-through text-gray-400">${item.price}</span>
                    <span className="text-green-600 font-extrabold">${discounted}</span>
                  </span>
                ) : (
                  <span className="text-green-600 font-extrabold">${item.price}</span>
                );
              })()}
            </div>
            {/* VARIANTS */}
            {item.variants.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-0.5">
                {item.variants.map((variant) => {
                  const discounted = applyDiscount(variant.price, item.discountRate);
                  return (
                    <div key={variant.name} className="flex items-center gap-1">
                      <span className="text-muted-foreground">{variant.name}</span>
                      {discounted ? (
                        <>
                          <span className="text-[10px] line-through text-gray-400">${variant.price}</span>
                          <span className="font-semibold text-green-600">${discounted}</span>
                        </>
                      ) : (
                        <span className="font-semibold text-green-600">${variant.price}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
            {/*  DESC */}
            <p className="text-gray-500">
              {item.description && item.description.length > 60
                ? item.description?.slice(0, 60)
                : item.description}
            </p>
            {/* TAGS & ALLERGENS */}
            {(item.tags.length > 0 || item.allergens.length > 0) && (
              <div className="flex flex-wrap gap-1 mt-1">
                {item.tags.slice(0, 2).map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="text-[10px] px-1.5 py-0"
                  >
                    {tag}
                  </Badge>
                ))}
                {item.tags.length > 2 && (
                  <Badge
                    variant="secondary"
                    className="text-[10px] px-1.5 py-0 text-muted-foreground"
                  >
                    +{item.tags.length - 2}
                  </Badge>
                )}
                {item.allergens.slice(0, 3).map((allergen) => (
                  <Badge
                    key={allergen}
                    variant="outline"
                    className="text-[10px] px-1.5 py-0 text-amber-600 border-amber-400"
                  >
                    {allergen}
                  </Badge>
                ))}
                {item.allergens.length > 3 && (
                  <Badge
                    variant="outline"
                    className="text-[10px] px-1.5 py-0 text-amber-600 border-amber-400"
                  >
                    +{item.allergens.length - 3}
                  </Badge>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
