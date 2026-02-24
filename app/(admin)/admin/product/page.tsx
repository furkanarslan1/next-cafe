import AdminProductFilter from "./_components/AdminProductFilter";
import AdminProductList from "./_components/AdminProductList";
import { createClient } from "@/lib/supabase/server";
import { CategoryType } from "@/types/menu/MenuTypes";
import { subTypeEnumMap } from "@/schemas/menuSchema";
import Pagination from "@/components/Pagination";
import { getProductsByCategory } from "@/app/(actions)/product/getProductsByCategory";

const CATEGORY_ORDER = ["drinks", "meals", "desserts"] as const;

interface ProductPageProps {
  searchParams: Promise<{ main?: string; sub?: string; page?: string }>;
}

export default async function ProductPage({ searchParams }: ProductPageProps) {
  const {
    main: queryMain,
    sub: querySub,
    page: queryPage,
  } = await searchParams;

  const currentPage = Math.max(1, Number(queryPage || 1));

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

  // Find the category IDs that match the selection in the database
  const filteredCategoryIds = allCategories
    .filter((c) => c.mainCategory === selectedMain && c.subType === selectedSub)
    .map((c) => c.id);

  const { products, totalPages } = await getProductsByCategory(
    filteredCategoryIds,
    currentPage,
  );

  return (
    <div className="p-6 space-y-6">
      <AdminProductFilter
        selectedMain={selectedMain}
        selectedSub={selectedSub}
      />
      <AdminProductList products={products} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        searchParams={{ main: selectedMain, sub: selectedSub }}
      />
    </div>
  );
}
