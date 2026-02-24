"use server";

import { deleteFromCloudinary } from "@/lib/cloudinary/upload";
import { rateLimit } from "@/lib/rate-limit";
import { createClient } from "@/lib/supabase/server";
import { ActionResponse } from "@/types/ActionResponseType";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function deleteProduct(
  productId: string,
): Promise<ActionResponse> {
  // Rate limit
  const headerList = await headers();
  const ip = headerList.get("x-forwarded-for") ?? "unknown";
  const { isRateLimited } = rateLimit.check(5, ip);
  if (isRateLimited) {
    return {
      success: false,
      error: "Too many requests. Please try again in a minute.",
    };
  }

  // Auth kontrolü
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (authError || !user) {
    return { success: false, error: "Unauthorized access." };
  }

  // Ürünü DB'den çek ve image_public_id al
  // Retrieve the product from the database and get the image_public_id
  const { data: product, error: fetchError } = await supabase
    .from("products")
    .select("id, image_public_id")
    .eq("id", productId)
    .single();

  if (fetchError || !product) {
    return { success: false, error: "Product not found." };
  }

  // Önce DB den sil
  // First delete from the database
  const { error: dbError } = await supabase
    .from("products")
    .delete()
    .eq("id", productId);

  if (dbError) {
    return { success: false, error: dbError.message };
  }

  // DB başarılıysa Cloudinary den sil
  // If the DB is successful, delete it from Cloudinary
  if (product.image_public_id) {
    await deleteFromCloudinary(product.image_public_id);
  }

  revalidatePath("/admin/product");
  revalidatePath("/menu");

  return { success: true };
}
