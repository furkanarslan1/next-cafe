"use client";

import { toggleOutOfStock } from "@/app/(actions)/product/toggleOutOfStock";
import { Switch } from "@/components/ui/switch";
import { Product } from "@/types/menu/MenuTypes";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

interface StockListProps {
  products: Product[];
}

export default function StockList({ products }: StockListProps) {
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const handleToggle = async (id: string, current: boolean) => {
    setTogglingId(id);
    const result = await toggleOutOfStock(id, current);
    if (result.success) {
      toast.success(current ? "Marked as in stock." : "Marked as out of stock.");
    } else {
      toast.error(result.error ?? "An error occurred.");
    }
    setTogglingId(null);
  };

  if (products.length === 0) {
    return (
      <p className="text-center text-muted-foreground py-16">
        No products found in this category.
      </p>
    );
  }

  return (
    <div className="flex flex-col divide-y divide-stone-100 border border-stone-200 rounded-xl overflow-hidden bg-white">
      {products.map((product) => (
        <div
          key={product.id}
          className={`flex items-center gap-4 px-4 py-3 transition-colors ${
            product.isOutOfStock ? "bg-red-50/50" : "hover:bg-stone-50"
          }`}
        >
          {/* IMAGE */}
          <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg border border-stone-100">
            <Image
              src={product.imageUrl || "/mocha.webp"}
              alt={product.title}
              fill
              className={`object-cover ${product.isOutOfStock ? "opacity-50" : ""}`}
            />
          </div>

          {/* TITLE */}
          <div className="flex-1 min-w-0">
            <p className={`text-sm font-medium truncate ${product.isOutOfStock ? "text-muted-foreground line-through" : ""}`}>
              {product.title}
            </p>
            {product.isOutOfStock && (
              <p className="text-xs text-red-500">Out of stock</p>
            )}
          </div>

          {/* SWITCH */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs text-muted-foreground hidden sm:block">
              {product.isOutOfStock ? "Out of stock" : "In stock"}
            </span>
            <Switch
              checked={!product.isOutOfStock}
              disabled={togglingId === product.id}
              onCheckedChange={() => handleToggle(product.id, product.isOutOfStock)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}