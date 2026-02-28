"use server";

import { rateLimit } from "@/lib/rate-limit";
import { createClient } from "@/lib/supabase/server";
import {
  PriceEditFormValues,
  priceEditSchema,
} from "@/schemas/priceEditSchema";
import { ActionResponse } from "@/types/ActionResponseType";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function updateProductPrice(
  productId: string,
  values: PriceEditFormValues,
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

  // Auth checks
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (authError || !user) {
    return { success: false, error: "Unaouthorized access" };
  }

  const validated = priceEditSchema.safeParse(values);
  if (!validated.success) {
    const errorMessage = validated.error.issues
      .map((e) => e.message)
      .join(", ");
    return { success: false, error: errorMessage };
  }

  const { error: dbError } = await supabase
    .from("products")
    .update({
      price: validated.data.price,
      discount_rate: validated.data?.discountRate,
      variants: validated.data?.variants,
    })
    .eq("id", productId);
  if (dbError) {
    return { success: false, error: dbError.message };
  }

  revalidatePath("/admin/prices");
  revalidatePath("/menu");

  return { success: true };
}
