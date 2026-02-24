"use server";

import {
  deleteFromCloudinary,
  uploadToCloudinary,
} from "@/lib/cloudinary/upload";
import { rateLimit } from "@/lib/rate-limit";
import { createClient } from "@/lib/supabase/server";
import { updateProductSchema } from "@/schemas/menuSchema";
import { ActionResponse } from "@/types/ActionResponseType";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import slugify from "slugify";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export async function updateProduct(
  productId: string,
  formData: FormData,
): Promise<ActionResponse> {
  //rate limit
  const headerList = await headers();
  const ip = headerList.get("x-forwarded-for") ?? "unknown";
  const { isRateLimited } = rateLimit.check(5, ip);
  if (isRateLimited) {
    return {
      success: false,
      error: "Too many requests. Please try again in a minute",
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

  // Resim değişti mi?
  //Has the picture changed?
  const file = formData.get("image");
  const imageChanged = file instanceof File && file.size > 0;

  // Resim validasyonu (sadece değiştiyse)
  // Image validation (only if changed)
  if (imageChanged) {
    if (!ALLOWED_TYPES.includes((file as File).type)) {
      return { success: false, error: "Invalid file type." };
    }
    if ((file as File).size > MAX_FILE_SIZE) {
      return { success: false, error: "File size exceeds 5MB" };
    }
  }

  // Form alanlarını parse et
  const raw = {
    categoryId: formData.get("categoryId"),
    title: formData.get("title"),
    description: formData.get("description") || undefined,
    price: Number(formData.get("price")),
    discountRate: Number(formData.get("discountRate") ?? 0),
    variants: JSON.parse((formData.get("variants") as string) ?? "[]"),
    isActive: formData.get("isActive") === "true",
    isFeatured: formData.get("isFeatured") === "true",
    isNew: formData.get("isNew") === "true",
    isPopular: formData.get("isPopular") === "true",
    isOutOfStock: formData.get("isOutOfStock") === "true",
    calories: formData.get("calories")
      ? Number(formData.get("calories"))
      : undefined,
    allergens: JSON.parse((formData.get("allergens") as string) ?? "[]"),
    tags: JSON.parse((formData.get("tags") as string) ?? "[]"),
    // Resim değiştiyse Zod'a geçiyoruz, değişmediyse undefined — updateProductSchema image'ı optional kabul eder
    // If the image changed, pass it to Zod; if not, undefined — updateProductSchema accepts image as optional
    image: imageChanged ? (file as File) : undefined,
  };

  // Zod ile doğrula
  // Verify with Zod
  const validated = updateProductSchema.safeParse(raw);
  if (!validated.success) {
    const errorMessage = validated.error.issues
      .map((e) => e.message)
      .join(", ");
    return { success: false, error: `Validation failed: ${errorMessage}` };
  }
  const data = validated.data;

  // Mevcut resim bilgileri
  // Current image information
  const existingImageUrl = formData.get("existingImageUrl") as string;
  const existingImagePublicId = formData.get("existingImagePublicId") as string;

  let imageUrl = existingImageUrl;
  let imagePublicId = existingImagePublicId;

  // Resim değiştiyse: yeni yükle, eskiyi sil
  // If the image has changed: upload the new one, delete the old one.
  if (imageChanged) {
    try {
      const uploaded = await uploadToCloudinary(data.image!);
      imageUrl = uploaded.url;
      imagePublicId = uploaded.publicId;
    } catch {
      return {
        success: false,
        error: "Image upload failed. Please try again.",
      };
    }
  }

  // Slug güncelle
  // Slug update
  const slug = slugify(data.title!, { lower: true, strict: true, locale: "tr" });

  // DB güncelle
  // DB update
  const { error: dbError } = await supabase
    .from("products")
    .update({
      category_id: data.categoryId,
      title: data.title,
      description: data.description,
      image_url: imageUrl,
      image_public_id: imagePublicId,
      slug,
      price: data.price,
      discount_rate: data.discountRate,
      variants: data.variants,
      is_active: data.isActive,
      is_featured: data.isFeatured,
      is_new: data.isNew,
      is_popular: data.isPopular,
      is_out_of_stock: data.isOutOfStock,
      calories: data.calories,
      allergens: data.allergens,
      tags: data.tags,
    })
    .eq("id", productId);

  if (dbError) {
    // DB başarısız ve resim değiştiyse yeni yüklenen resmi temizle
    // DB failed and image changed — delete the newly uploaded image to avoid orphans
    if (imageChanged) {
      await deleteFromCloudinary(imagePublicId);
    }
    return { success: false, error: dbError.message };
  }

  // DB başarılı ve resim değiştiyse eski resmi Cloudinary'den sil
  // DB succeeded and image changed — delete the old image from Cloudinary
  if (imageChanged && existingImagePublicId) {
    await deleteFromCloudinary(existingImagePublicId);
  }

  revalidatePath("/admin/product");
  revalidatePath("/menu");

  return { success: true };
}
