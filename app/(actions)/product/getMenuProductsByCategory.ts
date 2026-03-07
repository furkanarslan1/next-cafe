"use server";

import { createClient } from "@/lib/supabase/server";
import { Product } from "@/types/menu/MenuTypes";

export async function getMenuProductsByCategory(
  categoryIds: string[],
): Promise<Product[]> {
  if (categoryIds.length === 0) return [];

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .in("category_id", categoryIds)
    .eq("is_active", true)
    .eq("is_out_of_stock", false)
    .order("created_at", { ascending: false });

  if (error) return [];

  return (data ?? []).map((p) => ({
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
}
