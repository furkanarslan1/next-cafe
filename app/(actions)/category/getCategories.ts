"use server";
import { createClient } from "@/lib/supabase/server";
import { CategoryType } from "@/types/menu/MenuTypes";

export async function getCategories(): Promise<CategoryType[]> {
  const supabase = await createClient();

  const { data } = await supabase
    .from("categories")
    .select("id, label, slug, main_category, sub_type, is_active, created_at")
    .order("label");

  return (data ?? []).map((c) => ({
    id: c.id,
    label: c.label,
    slug: c.slug,
    mainCategory: c.main_category,
    subType: c.sub_type,
    isActive: c.is_active ?? true,
    createdAt: c.created_at ?? "",
  }));
}
