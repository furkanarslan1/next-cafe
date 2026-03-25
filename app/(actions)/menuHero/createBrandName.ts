"use server";

import { createClient } from "@/lib/supabase/server";
import { BrandNameInput } from "@/schemas/heroSettings";

import { ActionResponse } from "@/types/ActionResponseType";

export async function createBrandName(
  value: BrandNameInput,
): Promise<ActionResponse> {
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
    .eq("id", user.id)
    .single();

  if (!adminCheck) {
    return { success: false, error: "Admin access required." };
  }

  const { error } = await supabase
    .from("hero_settings")
    .update({ brand_name: value.brand_name })
    .eq("page", "global");

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}
