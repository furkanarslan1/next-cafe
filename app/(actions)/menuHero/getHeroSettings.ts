"use server";

import { createClient } from "@/lib/supabase/server";

export async function getHeroSettings(page: string) {
  const supabase = await createClient();

  const { data } = await supabase
    .from("hero_settings")
    .select("page, title, description, image_url, image_public_id, brand_name, instagram_url")
    .in("page", [page, "global"]);

  const hero = data?.find((r) => r.page === page);
  const global = data?.find((r) => r.page === "global");

  return { ...global, ...hero };
}
