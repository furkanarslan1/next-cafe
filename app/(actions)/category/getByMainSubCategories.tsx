"use server";

import { createClient } from "@/lib/supabase/server";
import { mainCategoryEnum } from "@/schemas/menuSchema";

export async function getByMainSubCategories(main: string, sub: string) {
  const parsed = mainCategoryEnum.safeParse(main);
  if (!parsed.success || !sub) {
    return [];
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("categories")
    .select("id, label")
    .eq("main_category", main)
    .eq("sub_type", sub)
    .eq("is_active", true)
    .order("label");

  if (error) {
    return [];
  }

  return data;
}
