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

  return {
    title: hero?.title,
    description: hero?.description,
    image_url: hero?.image_url,
    image_public_id: hero?.image_public_id,
    brand_name: global?.brand_name,
    instagram_url: global?.instagram_url,
  };
}
