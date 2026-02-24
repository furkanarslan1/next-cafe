"use server";

import { createClient } from "@/lib/supabase/server";
import { PaginationResult, Product } from "@/types/menu/MenuTypes";

export async function getProductsByCategory(
  categoryIds: string[],
  page: number = 1,
  limit: number = 10,
): Promise<PaginationResult> {
  if (categoryIds.length === 0) {
    return { products: [], totalCount: 0, totalPages: 0 };
  }

  const supabase = await createClient();
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, error, count } = await supabase
    .from("products")
    .select("*, categories(id, label, slug, main_category, sub_type)", {
      count: "exact",
    })
    .in("category_id", categoryIds)
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) {
    console.error("Error fetching products:", error);
    return { products: [], totalCount: 0, totalPages: 0 };
  }

  const products: Product[] = (data ?? []).map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    description: p.description ?? undefined,
    imageUrl: p.image_url ?? undefined,
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

  const totalCount = count ?? 0;
  const totalPages = Math.ceil(totalCount / limit);
  return { products, totalCount, totalPages };
}
