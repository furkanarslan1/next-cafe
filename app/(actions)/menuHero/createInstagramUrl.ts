"use server";

import { createClient } from "@/lib/supabase/server";
import { InstagramUrlInput } from "@/schemas/instagramUrl";
import { ActionResponse } from "@/types/ActionResponseType";

export async function createInstagramUrl(
  value: InstagramUrlInput,
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
    .update({ instagram_url: value.instagram_url })
    .eq("page", "global");

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}
