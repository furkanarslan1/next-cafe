"use server";

import { createClient } from "@/lib/supabase/server";
import {
  deleteFromCloudinary,
  uploadToCloudinary,
} from "@/lib/cloudinary/upload";
import { revalidatePath } from "next/cache";
import { ActionResponse } from "@/types/ActionResponseType";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export async function updateHeroPage(
  page: string,
  formData: FormData,
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

  const title = formData.get("title") as string;
  const description = (formData.get("description") as string) || undefined;
  const file = formData.get("image");
  const existingImagePublicId =
    (formData.get("existingImagePublicId") as string) || undefined;

  let imageUrl: string | undefined;
  let imagePublicId: string | undefined;

  if (file instanceof File && file.size > 0) {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return { success: false, error: "Invalid file type." };
    }
    if (file.size > MAX_FILE_SIZE) {
      return { success: false, error: "File size exceeds 5MB." };
    }

    try {
      const uploaded = await uploadToCloudinary(file, "cafe/hero");
      imageUrl = uploaded.url;
      imagePublicId = uploaded.publicId;
    } catch {
      return { success: false, error: "Image upload failed. Please try again." };
    }
  }

  const updateData: Record<string, string | undefined> = {
    title,
    description,
    ...(imageUrl && { image_url: imageUrl }),
    ...(imagePublicId && { image_public_id: imagePublicId }),
  };

  const { error: dbError } = await supabase
    .from("hero_settings")
    .update(updateData)
    .eq("page", page);

  if (dbError) {
    // DB başarısız → yeni yüklenen resmi sil
    if (imagePublicId) await deleteFromCloudinary(imagePublicId);
    return { success: false, error: dbError.message };
  }

  // DB başarılı → artık eski resmi güvenle silebiliriz
  if (imagePublicId && existingImagePublicId) {
    await deleteFromCloudinary(existingImagePublicId);
  }

  revalidatePath(`/menu/${page}`, "layout");
  revalidatePath("/admin/heroSettings", "layout");

  return { success: true };
}
