"use server";

import { createClient } from "@/lib/supabase/server";
import { updateCategorySchema } from "@/schemas/menuSchema";
import { revalidatePath } from "next/cache";
import slugify from "slugify";

export async function updateCategoryAction(
  id: string,
  values: { label: string; mainCategory: string; subType: string },
) {
  const validated = updateCategorySchema.safeParse(values);
  if (!validated.success) {
    return { success: false, error: "Invalid category data." };
  }

  const { label, mainCategory, subType } = validated.data;

  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { success: false, error: "Unauthorized access." };
  }

  const { data: adminCheck } = await supabase
    .from("admin_users")
    .select("id")
    .eq("email", user.email)
    .single();

  if (!adminCheck) {
    return { success: false, error: "Admin access required." };
  }

  const slug = label
    ? slugify(label, { strict: true, locale: "tr" })
    : undefined;

  const { error } = await supabase
    .from("categories")
    .update({
      ...(label && { label }),
      ...(slug && { slug }),
      ...(mainCategory && { main_category: mainCategory }),
      ...(subType && { sub_type: subType }),
    })
    .eq("id", id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/categories");
  revalidatePath("/menu", "layout");
  return { success: true };
}