"use server";

import { rateLimit } from "@/lib/rate-limit";
import { createClient } from "@/lib/supabase/server";
import {
  bulkPriceUpdateSchema,
  BulkPriceUpdateValues,
} from "@/schemas/bulkPriceUpdateSchema";
import { ActionResponse } from "@/types/ActionResponseType";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function bulkUpdatePrices(
  values: BulkPriceUpdateValues,
  categoryIds: string[],
): Promise<ActionResponse> {
  //rate-limit
  const headerList = await headers();
  const ip = headerList.get("x-forwarded-for") ?? "unknown";
  const { isRateLimited } = rateLimit.check(3, ip);
  if (isRateLimited) {
    return {
      success: false,
      error: "Too many requests. Please try again in a minute",
    };
  }

  //auth
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (authError || !user) {
    return { success: false, error: "Unauthorized access." };
  }

  //valdiation
  const validated = bulkPriceUpdateSchema.safeParse(values);
  if (!validated.success) {
    const errorMessage = validated.error.issues
      .map((e) => e.message)
      .join(", ");
    return { success: false, error: `Validation failed: ${errorMessage}` };
  }

  const { type, value, scope } = validated.data;

  //get products
  let query = supabase.from("products").select("id,price");
  if (scope === "category") {
    if (categoryIds.length === 0) {
      return { success: false, error: "No category selected" };
    }
    query = query.in("category_id", categoryIds);
  }

  const { data: products, error: fetchError } = await query;
  if (fetchError) return { success: false, error: fetchError.message };
  if (!products || products.length === 0) {
    return { success: false, error: "No products found." };
  }

  //calculate new values
  const updates = products.map((p) => {
    if (type === "fixed_increase") {
      return { id: p.id, price: Math.round((p.price + value) * 100) / 100 };
    } else if (type === "percent_increase") {
      return {
        id: p.id,
        price: Math.round(p.price * (1 + value / 100) * 100) / 100,
      };
    } else {
      return { id: p.id, discount_rate: value };
    }
  });

  // Her ürünü ayrı UPDATE et — upsert INSERT dener ve NOT NULL alanlar hata verir
  const results = await Promise.all(
    updates.map(({ id, ...fields }) =>
      supabase.from("products").update(fields).eq("id", id),
    ),
  );

  const updateError = results.find((r) => r.error)?.error;
  if (updateError) return { success: false, error: updateError.message };

  revalidatePath("/admin/prices");
  revalidatePath("/admin/product");
  revalidatePath("/menu");

  return { success: true };
}
