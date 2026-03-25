import { CategoryType, Product } from "@/types/menu/MenuTypes";
import React, { Suspense } from "react";
import MenuCategories from "../_components/MenuCategories";
import MenuItems from "../_components/MenuItems";
import { getCategories } from "@/app/(actions)/category/getCategories";
import { getMenuProductsByCategory } from "@/app/(actions)/product/getMenuProductsByCategory";
import HeroMenu from "../_components/HeroMenu";

interface DessertsPageProps {
  searchParams: Promise<{ category: string; dessertType: string }>;
}

export default async function DessertsPage({
  searchParams,
}: DessertsPageProps) {
  const { category, dessertType } = await searchParams;
  const selectedDessertType = dessertType || "cake";

  const allCategories = await getCategories();
  const filteredCategory = allCategories.filter(
    (cat) =>
      cat.mainCategory === "desserts" && cat.subType === selectedDessertType,
  );
  const selectedCategory = category || filteredCategory[0]?.slug || "";
  const selectedCategoryObj = filteredCategory.find(
    (c) => c.slug === selectedCategory,
  );
  const products = await getMenuProductsByCategory(
    selectedCategoryObj ? [selectedCategoryObj.id] : [],
  );
  return (
    <div className="  ">
      <Suspense fallback={<div className="h-20">Loading...</div>}>
        <HeroMenu page="desserts" />
        <MenuCategories
          selectedCategory={selectedCategory}
          categories={filteredCategory}
        />
      </Suspense>
      <MenuItems items={products} />
    </div>
  );
}
