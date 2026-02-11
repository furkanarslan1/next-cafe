import { ProductType } from "@/types/menu/MenuTypes";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface MenuItemsProps {
  items: ProductType[];
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
              src={item.image || "/customer-favorites/brownie.webp"}
              alt={item.title || "drink-image"}
              fill
              className="object-contain"
            />
          </Link>
          {/*  TITLE & PRICE */}
          <div className="flex flex-col flex-1">
            <div className="flex items-center justify-between w-full">
              <p className="font-bold">{item.title}</p>
              <p className="text-green-600">${item.price}</p>
            </div>
            {/*  DESC */}
            <p className="text-gray-500">
              {item.description && item.description.length > 60
                ? item.description?.slice(0, 60)
                : item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
