import AdminProductFilter from "./_components/AdminProductFilter";
import { createClient } from "@/lib/supabase/server";
import { CategoryType } from "@/types/menu/MenuTypes";
import { subTypeEnumMap } from "@/schemas/menuSchema";

const CATEGORY_ORDER = ["drinks", "meals", "desserts"] as const;

interface ProductPageProps {
  searchParams: Promise<{ main?: string; sub?: string }>;
}

export default async function ProductPage({ searchParams }: ProductPageProps) {
  const { main: queryMain, sub: querySub } = await searchParams;

  const supabase = await createClient();

  const { data: categories } = await supabase
    .from("categories")
    .select("id, label, slug, main_category, sub_type, is_active, created_at")
    .order("label");

  const allCategories: CategoryType[] = (categories ?? []).map((c) => ({
    id: c.id,
    label: c.label,
    slug: c.slug,
    mainCategory: c.main_category,
    subType: c.sub_type,
    isActive: c.is_active ?? true,
    createdAt: c.created_at ?? "",
  }));

  // Varsayılan: sıralamada ilk main kategori ve onun ilk sub tipi (schema'dan)
  // Default: the first main category and its first sub-type in the list (from the schema)
  const defaultMain =
    CATEGORY_ORDER.find(
      (m) => subTypeEnumMap[m as keyof typeof subTypeEnumMap],
    ) ?? "drinks";

  const defaultSub =
    subTypeEnumMap[defaultMain as keyof typeof subTypeEnumMap].options[0];

  const selectedMain =
    queryMain && queryMain in subTypeEnumMap ? queryMain : defaultMain;

  const validSubOptions =
    subTypeEnumMap[selectedMain as keyof typeof subTypeEnumMap].options;
  const selectedSub =
    querySub && (validSubOptions as readonly string[]).includes(querySub)
      ? querySub
      : validSubOptions[0];

  // Seçime uyan category ID'lerini DB'den bul
  // Find the category IDs that match the selection in the database
  const filteredCategoryIds = allCategories
    .filter((c) => c.mainCategory === selectedMain && c.subType === selectedSub)
    .map((c) => c.id);

  let products = null;
  let error = null;

  if (filteredCategoryIds.length > 0) {
    const result = await supabase
      .from("products")
      .select("*, categories(id, label, slug, main_category, sub_type)")
      .in("category_id", filteredCategoryIds)
      .order("created_at", { ascending: false });

    products = result.data;
    error = result.error;
  }

  if (error) {
    console.error(
      "An error occurred while retrieving products.",
      error.message,
    );
  }

  return (
    <div className="p-6 space-y-6">
      <AdminProductFilter
        selectedMain={selectedMain}
        selectedSub={selectedSub}
      />
      {products && products.length > 0 ? (
        <p className="text-sm text-muted-foreground">
          {products.length} product(s) found
        </p>
      ) : (
        <p className="text-sm text-muted-foreground">No products found.</p>
      )}
    </div>
  );
}
