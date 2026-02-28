import { CategoryType } from "@/types/menu/MenuTypes";
import AdminProductFilter from "../product/_components/AdminProductFilter";
import { createClient } from "@/lib/supabase/server";
import { subTypeEnumMap } from "@/schemas/menuSchema";
import AdminPricesCard from "./_components/AdminPricesCard";
import { getProductsByCategory } from "@/app/(actions)/product/getProductsByCategory";
import Pagination from "@/components/Pagination";
import { Suspense } from "react";
import BulkPriceUpdateModal from "./_components/BulkPriceUpdateModal";

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

  const { products, totalPages } = await getProductsByCategory(
    filteredCategoryIds,
    currentPage,
    12,
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6 mt-10 p-4">
      <div className="flex flex-col gap-6 ">
        <h1 className="text-2xl font-bold">Price Management</h1>
        <BulkPriceUpdateModal categoryIds={filteredCategoryIds} />
      </div>

      <Suspense fallback={null}>
        <AdminProductFilter
          selectedMain={selectedMain}
          selectedSub={selectedSub}
        />
      </Suspense>

      {products.length === 0 ? (
        <p className="text-center text-muted-foreground py-12">
          No products found in this category.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <AdminPricesCard key={product.id} product={product} />
          ))}
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        searchParams={{ main: selectedMain, sub: selectedSub }}
      />
    </div>
  );
}
