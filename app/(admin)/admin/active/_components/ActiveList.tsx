"use client";

import { toggleIsActive } from "@/app/(actions)/product/toggleIsActive";
import { Switch } from "@/components/ui/switch";
import { Product } from "@/types/menu/MenuTypes";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

interface ActiveListProps {
  products: Product[];
}

export default function ActiveList({ products }: ActiveListProps) {
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const handleToggle = async (id: string, current: boolean) => {
    setTogglingId(id);
    const result = await toggleIsActive(id, current);
    if (result.success) {
      toast.success(current ? "Product set to draft." : "Product set to active.");
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
            !product.isActive ? "bg-stone-50/80" : "hover:bg-stone-50"
          }`}
        >
          {/* IMAGE */}
          <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg border border-stone-100">
            <Image
              src={product.imageUrl || "/mocha.webp"}
              alt={product.title}
              fill
              className={`object-cover ${!product.isActive ? "opacity-40" : ""}`}
            />
          </div>

          {/* TITLE */}
          <div className="flex-1 min-w-0">
            <p className={`text-sm font-medium truncate ${!product.isActive ? "text-muted-foreground" : ""}`}>
              {product.title}
            </p>
            <p className={`text-xs ${product.isActive ? "text-green-600" : "text-stone-400"}`}>
              {product.isActive ? "Active" : "Draft"}
            </p>
          </div>

          {/* SWITCH */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs text-muted-foreground hidden sm:block">
              {product.isActive ? "Active" : "Draft"}
            </span>
            <Switch
              checked={product.isActive}
              disabled={togglingId === product.id}
              onCheckedChange={() => handleToggle(product.id, product.isActive)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}