export const revalidate = 518400; // 6 days — keeps Supabase active, revalidated on admin actions via revalidatePath

import { createClient } from "@/lib/supabase/server";
import { MENU_CONFIG, MainCategoryKey } from "@/config/menuConfig";
import { CategoryType, Product } from "@/types/menu/MenuTypes";
import PrintButton from "./_components/PrintButton";

async function getPrintMenuData() {
  const supabase = await createClient();

  const { data: categoriesData } = await supabase
    .from("categories")
    .select("id, label, slug, main_category, sub_type, is_active, created_at")
    .eq("is_active", true)
    .order("label");

  const { data: productsData } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .eq("is_out_of_stock", false)
    .order("title");

  const categories: CategoryType[] = (categoriesData ?? []).map((c) => ({
    id: c.id,
    label: c.label,
    slug: c.slug,
    mainCategory: c.main_category,
    subType: c.sub_type,
    isActive: c.is_active ?? true,
    createdAt: c.created_at ?? "",
  }));

  const products: Product[] = (productsData ?? []).map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    description: p.description ?? undefined,
    imageUrl: p.image_url ?? undefined,
    imagePublicId: p.image_public_id ?? undefined,
    price: p.price,
    discountRate: p.discount_rate,
    variants: p.variants ?? [],
    categoryId: p.category_id,
    isActive: p.is_active,
    isFeatured: p.is_featured,
    isNew: p.is_new,
    isPopular: p.is_popular,
    isOutOfStock: p.is_out_of_stock,
    calories: p.calories ?? undefined,
    allergens: p.allergens ?? [],
    tags: p.tags ?? [],
    createdAt: p.created_at,
  }));

  return { categories, products };
}

function applyDiscount(price: number, rate: number) {
  if (rate <= 0) return null;
  return Math.round(price * (1 - rate / 100) * 100) / 100;
}

export default async function PrintMenuPage() {
  const { categories, products } = await getPrintMenuData();

  // Group: mainCategory → subType → category → products
  const grouped = Object.entries(MENU_CONFIG) as [MainCategoryKey, (typeof MENU_CONFIG)[MainCategoryKey]][];

  return (
    <div className="min-h-screen bg-white">
      {/* PRINT BUTTON — hidden on print */}
      <div className="print:hidden fixed top-4 right-4 z-50">
        <PrintButton />
      </div>

      {/* MENU CONTENT */}
      <div className="max-w-3xl mx-auto px-8 py-12 print:py-6 print:px-6">

        {/* HEADER */}
        <div className="text-center mb-10 print:mb-8 border-b border-stone-200 pb-8">
          <h1 className="text-4xl font-bold tracking-tight">Menu</h1>
        </div>

        {grouped.map(([mainKey, mainConfig]) => {
          const mainCategories = categories.filter((c) => c.mainCategory === mainKey);
          if (mainCategories.length === 0) return null;

          return (
            <div key={mainKey} className="mb-10 print:mb-8 print:break-inside-avoid">
              {/* MAIN CATEGORY HEADER */}
              <h2 className="text-2xl font-bold uppercase tracking-widest mb-6 print:mb-4 pb-2 border-b-2 border-stone-900">
                {mainConfig.label}
              </h2>

              {mainConfig.subTypes.map((subType) => {
                const subCategories = mainCategories.filter(
                  (c) => c.subType === subType.value,
                );
                if (subCategories.length === 0) return null;

                return (
                  <div key={subType.value} className="mb-8 print:mb-6">
                    {/* SUB TYPE LABEL */}
                    <h3 className="text-sm font-semibold uppercase tracking-widest text-stone-400 mb-4 print:mb-3">
                      — {subType.label}
                    </h3>

                    {subCategories.map((cat) => {
                      const catProducts = products.filter(
                        (p) => p.categoryId === cat.id,
                      );
                      if (catProducts.length === 0) return null;

                      return (
                        <div key={cat.id} className="mb-6 print:mb-4 print:break-inside-avoid">
                          {/* CATEGORY NAME */}
                          <h4 className="text-base font-semibold text-stone-600 mb-3 print:mb-2">
                            {cat.label}
                          </h4>

                          {/* PRODUCTS */}
                          <div className="space-y-3 print:space-y-2">
                            {catProducts.map((product) => {
                              const discounted = applyDiscount(product.price, product.discountRate);
                              return (
                                <div
                                  key={product.id}
                                  className="flex items-start justify-between gap-4"
                                >
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 flex-wrap">
                                      <span className="font-medium text-sm">{product.title}</span>
                                      {product.isNew && (
                                        <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">New</span>
                                      )}
                                    </div>
                                    {product.description && (
                                      <p className="text-xs text-stone-400 mt-0.5 leading-relaxed">
                                        {product.description}
                                      </p>
                                    )}
                                    {product.allergens.length > 0 && (
                                      <p className="text-[10px] text-stone-400 mt-0.5">
                                        Allergens: {product.allergens.join(", ")}
                                      </p>
                                    )}
                                  </div>

                                  {/* PRICE */}
                                  <div className="text-right shrink-0">
                                    {product.variants.length > 0 ? (
                                      <div className="space-y-0.5">
                                        {product.variants.map((v) => {
                                          const vDiscounted = applyDiscount(v.price, product.discountRate);
                                          return (
                                            <div key={v.name} className="flex items-center gap-2 justify-end text-xs">
                                              <span className="text-stone-400">{v.name}</span>
                                              {vDiscounted ? (
                                                <span className="font-semibold">${vDiscounted}</span>
                                              ) : (
                                                <span className="font-semibold">${v.price}</span>
                                              )}
                                            </div>
                                          );
                                        })}
                                      </div>
                                    ) : product.price > 0 ? (
                                      <div className="text-sm font-semibold">
                                        {discounted ? (
                                          <span>${discounted}</span>
                                        ) : (
                                          <span>${product.price}</span>
                                        )}
                                      </div>
                                    ) : null}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          );
        })}

        {/* FOOTER */}
        <div className="text-center text-xs text-stone-300 mt-12 print:mt-8 border-t border-stone-100 pt-6">
          Prices are subject to change.
        </div>
      </div>
    </div>
  );
}