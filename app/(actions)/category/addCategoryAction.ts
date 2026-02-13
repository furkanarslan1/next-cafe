"use server";

import { createClient } from "@/lib/supabase/server";
import {
  CreateCategoryInput,
  createCategorySchema,
} from "@/schemas/menuSchema";
import { revalidatePath } from "next/cache";
import slugify from "slugify";

export async function addCategoryAction(values: CreateCategoryInput) {
  const validated = createCategorySchema.safeParse(values);
  if (!validated.success) {
    return { success: false, error: "Invalid category data." };
  }

  const { label, mainCategory, subType } = validated.data;

  const slug = slugify(label, {
    strict: true,
    locale: "tr",
  });

  const supabase = await createClient();

  const { error } = await supabase.from("categories").insert({
    label,
    slug,
    main_category: mainCategory,
    sub_type: subType,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/categories");
  return { success: true };
}