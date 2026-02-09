import { ItemType } from "@/types/ItemsType";
import Image from "next/image";
import React from "react";

interface ItemCardProps {
  item: ItemType;
}

export default function ItemCard({ item }: ItemCardProps) {
  return (
    <div className="max-h-80 max-w-50 overflow-hidden space-y-4">
      <div className="relative h-40 w-40 ">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-contain"
        />
      </div>
      <div className="flex flex-col gap-2 items-start text-xs md:text-sm px-2 ">
        <div className="flex items-center justify-between w-full font-bold">
          <p className="">{item.title}</p>
          <p className="text-green-600 ">${item.price}</p>
        </div>
        <p className="text-xs hidden md:block">
          {item.description.length > 90
            ? item.description.slice(0, 90) + "..."
            : item.description}
        </p>
      </div>
    </div>
  );
}
