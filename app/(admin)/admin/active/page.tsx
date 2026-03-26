import { createClient } from "@/lib/supabase/server";
import { Product } from "@/types/menu/MenuTypes";
import { subTypeEnumMap } from "@/schemas/menuSchema";
import { MAIN_CATEGORIES } from "@/config/menuConfig";
import AdminProductFilter from "../product/_components/AdminProductFilter";
import ActiveList from "./_components/ActiveList";
import { Suspense } from "react";

interface AdminActivePageProps {
  searchParams: Promise<{ main?: string; sub?: string }>;
}

export default async function AdminActivePage({ searchParams }: AdminActivePageProps) {
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
    .select("id")
    .eq("main_category", selectedMain)
    .eq("sub_type", selectedSub);

  const filteredCategoryIds = (categoriesData ?? []).map((c) => c.id);

  const { data: productsData } = await supabase
    .from("products")
    .select("*")
    .in("category_id", filteredCategoryIds.length > 0 ? filteredCategoryIds : [""])
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

  const draftCount = products.filter((p) => !p.isActive).length;

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Visibility</h1>
        {draftCount > 0 && (
          <p className="text-sm text-muted-foreground mt-0.5">
            {draftCount} product{draftCount > 1 ? "s" : ""} hidden from menu
          </p>
        )}
      </div>

      <Suspense fallback={null}>
        <AdminProductFilter
          selectedMain={selectedMain}
          selectedSub={selectedSub}
        />
      </Suspense>

      <ActiveList products={products} />
    </div>
  );
}