"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function toggleCategoryActive(id: string, current: boolean) {
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

  const { error } = await supabase
    .from("categories")
    .update({ is_active: !current })
    .eq("id", id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/categories");
  revalidatePath("/menu", "layout");
  return { success: true };
}