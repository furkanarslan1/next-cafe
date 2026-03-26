export const revalidate = 518400; // 6 days — keeps Supabase active, revalidated on admin actions via revalidatePath

import { Suspense } from "react";
import MenuCategories from "../_components/MenuCategories";
import MenuItems from "../_components/MenuItems";
import { getCategories } from "@/app/(actions)/category/getCategories";
import { getMenuProductsByCategory } from "@/app/(actions)/product/getMenuProductsByCategory";
import HeroMenu from "../_components/HeroMenu";

interface MealsPageProps {
  searchParams: Promise<{ mealType: string; category: string }>;
}

export default async function MealsPage({ searchParams }: MealsPageProps) {
  const { mealType, category } = await searchParams;
  const Meal = mealType || "breakfast";

  const allCategories = await getCategories();

  const filteredCategories = allCategories.filter(
    (cat) => cat.mainCategory === "meals" && cat.subType === Meal && cat.isActive,
  );

  const selectedCategory = category || filteredCategories[0]?.slug || "";
  const selectedCategoryObj = filteredCategories.find(
    (c) => c.slug === selectedCategory,
  );

  const products = await getMenuProductsByCategory(
    selectedCategoryObj ? [selectedCategoryObj.id] : [],
  );
  return (
    <div>
      <Suspense fallback={<div className="h-20">Loading...</div>}>
        <HeroMenu page="meals" />
        <MenuCategories
          selectedCategory={selectedCategory}
          categories={filteredCategories}
        />
      </Suspense>
      <MenuItems items={products} />
    </div>
  );
}
