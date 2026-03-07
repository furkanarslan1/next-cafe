"use server";

import { createClient } from "@/lib/supabase/server";
import { ProductWithCategory } from "@/types/menu/MenuTypes";

export async function getProductBySlug(slug: string): Promise<ProductWithCategory | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select("*, categories(id, label, slug, main_category, sub_type)")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (error || !data) return null;

  return {
    id: data.id,
    slug: data.slug,
    title: data.title,
    description: data.description ?? undefined,
    imageUrl: data.image_url ?? undefined,
    imagePublicId: data.image_public_id ?? undefined,
    price: data.price,
    discountRate: data.discount_rate,
    variants: data.variants ?? [],
    categoryId: data.category_id,
    isActive: data.is_active,
    isFeatured: data.is_featured,
    isNew: data.is_new,
    isPopular: data.is_popular,
    isOutOfStock: data.is_out_of_stock,
    calories: data.calories ?? undefined,
    allergens: data.allergens ?? [],
    tags: data.tags ?? [],
    createdAt: data.created_at,
    category: {
      id: data.categories.id,
      label: data.categories.label,
      slug: data.categories.slug,
      mainCategory: data.categories.main_category,
      subType: data.categories.sub_type,
      isActive: data.categories.is_active ?? true,
      createdAt: data.categories.created_at ?? "",
    },
  };
}
