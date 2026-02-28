import { CategoryType } from "@/types/menu/MenuTypes";
import AdminProductFilter from "../product/_components/AdminProductFilter";
import { createClient } from "@/lib/supabase/server";
import { subTypeEnumMap } from "@/schemas/menuSchema";

const CATEGORY_ORDER = ["drinks", "meals", "desserts"] as const;

interface AdminPricesProps {
  searchParams: Promise<{ main?: string; sub?: string; page?: string }>;
}

export default async function AdminPricesPage({
  searchParams,
}: AdminPricesProps) {
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

  const defaultMain =
    CATEGORY_ORDER.find(
      (m) => subTypeEnumMap[m as keyof typeof subTypeEnumMap],
    ) ?? "drinks";

  const selectedMain =
    queryMain && queryMain in subTypeEnumMap ? queryMain : defaultMain;

  const validSubOptions =
    subTypeEnumMap[selectedMain as keyof typeof subTypeEnumMap].options;
  const selectedSub =
    querySub && (validSubOptions as readonly string[]).includes(querySub)
      ? querySub
      : validSubOptions[0];

  const filteredCategoryIds = allCategories
    .filter((c) => c.mainCategory === selectedMain && c.subType === selectedSub)
    .map((c) => c.id);

  return (
    <div className="max-w-6xl mx-auto space-y-12 mt-10 p-4">
      <h1 className="text-2xl font-bold text-center">Price Management</h1>
      <AdminProductFilter
        selectedMain={selectedMain}
        selectedSub={selectedSub}
      />
    </div>
  );
}
