"use server";

import { createClient } from "@/lib/supabase/server";
import { loginSchema, LoginValues } from "@/schemas/authSchema";

import { revalidatePath } from "next/cache";

export async function loginAction(values: LoginValues) {
  const validateFileds = loginSchema.safeParse(values);
  if (!validateFileds.success) {
    return { error: "Invalid email or password format." };
  }

  const { email, password } = validateFileds.data;
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.signInWithPassword({ email, password });
  if (authError || !user) {
    return { error: "Invalid credentials. Please try again." };
  }

  const { data: adminData, error: adminError } = await supabase
    .from("admin_users")
    .select("id")
    .eq("id", user.id)
    .single();

  if (adminError || !adminData) {
    // Admin değilse oturumu kapat ki arkada açık kalmasın
    // If you're not an admin, log out so it doesn't stay open in the background.
    await supabase.auth.signOut();
    return { error: "You do not have permission to access this panel." };
  }

  revalidatePath("/", "layout");
  return { success: true };
}
