import { createClient } from "@/lib/supabase/server";
import { CategoryType, Product } from "@/types/menu/MenuTypes";
import { subTypeEnumMap } from "@/schemas/menuSchema";
import { MAIN_CATEGORIES } from "@/config/menuConfig";
import AdminProductFilter from "../product/_components/AdminProductFilter";
import StockList from "./_components/StockList";
import { Suspense } from "react";

interface AdminStockPageProps {
  searchParams: Promise<{ main?: string; sub?: string }>;
}

export default async function AdminStockPage({ searchParams }: AdminStockPageProps) {
  const { main: queryMain, sub: querySub } = await searchParams;

  const defaultMain = MAIN_CATEGORIES[0];
  const selectedMain =
    queryMain && queryMain in subTypeEnumMap ? queryMain : defaultMain;

  const validSubOptions =
    subTypeEnumMap[selectedMain as keyof typeof subTypeEnumMap].options;
  const selectedSub =
    querySub && (validSubOptions as readonly string[]).includes(querySub)
      ? querySub
      : validSubOptions[0];

  const supabase = await createClient();

  const { data: categoriesData } = await supabase
    .from("categories")
    .select("id, label, slug, main_category, sub_type, is_active, created_at")
    .eq("main_category", selectedMain)
    .eq("sub_type", selectedSub);

  const filteredCategoryIds = (categoriesData ?? []).map((c) => c.id);

  const { data: productsData } = await supabase
    .from("products")
    .select("*")
    .in("category_id", filteredCategoryIds.length > 0 ? filteredCategoryIds : [""])
    .eq("is_active", true)
    .order("title");

  const products: Product[] = (productsData ?? []).map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    description: p.description ?? undefined,
    imageUrl: p.image_url ?? undefined,
    imagePublicId: p.image_public_id ?? undefined,
    price: p.price,
    discountRate: p.discount_rate,
    variants: p.variants ?? [],
    categoryId: p.category_id,
    isActive: p.is_active,
    isFeatured: p.is_featured,
    isNew: p.is_new,
    isPopular: p.is_popular,
    isOutOfStock: p.is_out_of_stock,
    calories: p.calories ?? undefined,
    allergens: p.allergens ?? [],
    tags: p.tags ?? [],
    createdAt: p.created_at,
  }));

  const outOfStockCount = products.filter((p) => p.isOutOfStock).length;

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Stock Management</h1>
          {outOfStockCount > 0 && (
            <p className="text-sm text-red-500 mt-0.5">
              {outOfStockCount} product{outOfStockCount > 1 ? "s" : ""} out of stock
            </p>
          )}
        </div>
      </div>

      <Suspense fallback={null}>
        <AdminProductFilter
          selectedMain={selectedMain}
          selectedSub={selectedSub}
        />
      </Suspense>

      <StockList products={products} />
    </div>
  );
}