"use client";

import { CategoryType } from "@/types/menu/MenuTypes";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface MenuCategoriesProps {
  categories: CategoryType[];
  selectedCategory: string;
}

export default function MenuCategories({
  categories,
  selectedCategory,
}: MenuCategoriesProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handlechange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("category", value);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };
  return (
    <div className="flex gap-2 overflow-x-auto p-4 max-w-5xl mx-auto scrollbar-hide">
      {categories.map((cat) => (
        <div
          key={cat.id}
          onClick={() => handlechange(cat.slug)}
          className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
            selectedCategory === cat.slug
              ? "bg-stone-800 text-white"
              : "bg-stone-200 text-stone-600 hover:bg-stone-300"
          }`}
        >
          {cat.label}
        </div>
      ))}
    </div>
  );
}
