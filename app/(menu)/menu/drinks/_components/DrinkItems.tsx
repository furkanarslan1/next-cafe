import { DrinkProductType } from "@/types/menu/drinks/drinksType";
import Image from "next/image";
import React from "react";

interface DrinkItemProps {
  drinks: DrinkProductType[];
}

export default function DrinkItems({ drinks }: DrinkItemProps) {
  return (
    <div className="text-xs md:sm p-4 max-w-5xl mx-auto">
      {drinks.map((drink) => (
        <div
          key={drink.id}
          className="flex items-center justify-center gap-2 border-b border-stone-200"
        >
          {/* DRINK IMAGE */}

          <div className="relative h-20 w-20 shrink-0">
            <Image
              src={drink.image || "/customer-favorites/brownie.webp"}
              alt={drink.title || "drink-image"}
              fill
              className="object-contain"
            />
          </div>
          {/* DRINK TITLE & PRICE */}
          <div className="flex flex-col flex-1">
            <div className="flex items-center justify-between w-full">
              <p className="font-bold">{drink.title}</p>
              <p className="text-green-600">${drink.price}</p>
            </div>
            {/* DRINK DESC */}
            <p className="text-gray-500">
              {drink.description && drink.description.length > 60
                ? drink.description?.slice(0, 60)
                : drink.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
