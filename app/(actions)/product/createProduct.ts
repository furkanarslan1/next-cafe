"use server";

import { createClient } from "@/lib/supabase/server";
import { createProductSchema } from "@/schemas/menuSchema";
import {
  deleteFromCloudinary,
  uploadToCloudinary,
} from "@/lib/cloudinary/upload";
import { revalidatePath } from "next/cache";
import slugify from "slugify";
import { headers } from "next/headers";
import { rateLimit } from "@/lib/rate-limit";
import { ActionResponse } from "@/types/ActionResponseType";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export async function createProduct(
  formData: FormData,
): Promise<ActionResponse> {
  // Rate limiting
  const headerList = await headers();
  const ip = headerList.get("x-forwarded-for") ?? "unknown";
  const { isRateLimited } = rateLimit.check(5, ip);
  if (isRateLimited) {
    return {
      success: false,
      error: "Too many requests. Please try again in a minute.",
    };
  }

  //auth kontrolü

  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (authError || !user) {
    return { success: false, error: "Unauthorized access." };
  }

  //Dosyayı al ve doğrula

  const file = formData.get("image");
  if (!(file instanceof File) || file.size === 0) {
    return { success: false, error: "Image is required." };
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return { success: false, error: "Invalid file type." };
  }

  if (file.size > MAX_FILE_SIZE) {
    return { success: false, error: "File size exceeds 5MB" };
  }

  //   Geri kalan form alanlarını parse et

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
    image: file,
  };

  //Zod ile doğrula
  const validated = createProductSchema.safeParse(raw);
  if (!validated.success) {
    const errorMessage = validated.error.issues
      .map((e) => e.message)
      .join(", ");
    return { success: false, error: `Validation failed: ${errorMessage}` };
  }

  const data = validated.data;

  //    Cloudinary'e yükle

  let imageUrl: string;
  let imagePublicId: string;
  try {
    const uploaded = await uploadToCloudinary(data.image);
    imageUrl = uploaded.url;
    imagePublicId = uploaded.publicId;
  } catch {
    return { success: false, error: "Image upload failed. Please try again." };
  }

  //Slug oluştur

  const slug = slugify(data.title, { lower: true, strict: true, locale: "tr" });

  // save to supabase

  const { error: dbError } = await supabase.from("products").insert({
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
  });

  if (dbError) {
    // DB başarısız → Cloudinary'deki resmi temizle
    await deleteFromCloudinary(imagePublicId);
    return { success: false, error: dbError.message };
  }

  revalidatePath("/admin/products");
  revalidatePath("/menu");

  return { success: true };
}
