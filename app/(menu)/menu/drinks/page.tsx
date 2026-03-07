import { Suspense } from "react";
import MenuCategories from "../_components/MenuCategories";
import MenuItems from "../_components/MenuItems";
import { createClient } from "@/lib/supabase/server";
import { getMenuProductsByCategory } from "@/app/(actions)/product/getMenuProductsByCategory";
import { CategoryType } from "@/types/menu/MenuTypes";

interface DrinkPageProps {
  searchParams: Promise<{ drinkTemperature: string; category: string }>;
}

export default async function DrinksPage({ searchParams }: DrinkPageProps) {
  const { drinkTemperature, category } = await searchParams;
  const temperature = drinkTemperature || "hot";

  const supabase = await createClient();

  const { data: rawCategories } = await supabase
    .from("categories")
    .select("id, label, slug, main_category, sub_type, is_active, created_at")
    .order("label");

  const allCategories: CategoryType[] = (rawCategories ?? []).map((c) => ({
    id: c.id,
    label: c.label,
    slug: c.slug,
    mainCategory: c.main_category,
    subType: c.sub_type,
    isActive: c.is_active ?? true,
    createdAt: c.created_at ?? "",
  }));

  const filteredCategories = allCategories.filter(
    (cat) => cat.mainCategory === "drinks" && cat.subType === temperature,
  );
  const selectedCategory = category || filteredCategories[0]?.slug || "";
  const selectedCategoryObj = filteredCategories.find(
    (c) => c.slug === selectedCategory,
  );

  const products = await getMenuProductsByCategory(
    selectedCategoryObj ? [selectedCategoryObj.id] : [],
  );

  console.log("selectedCategoryObj:", selectedCategoryObj);
  console.log("products:", products);
  return (
    <div>
      <Suspense fallback={<div className="h-20">Loading...</div>}>
        <MenuCategories
          selectedCategory={selectedCategory}
          categories={filteredCategories}
        />
      </Suspense>
      <MenuItems items={products} />
    </div>
  );
}
