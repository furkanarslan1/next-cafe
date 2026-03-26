import { getCategories } from "@/app/(actions)/category/getCategories";
import AdminProductFilter from "../product/_components/AdminProductFilter";
import CategoryCard from "./_components/CategoryCard";
import ToastHandler from "@/components/ToastHandler";
import { Button } from "@/components/ui/button";
import { subTypeEnumMap } from "@/schemas/menuSchema";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { Suspense } from "react";

const MAIN_CATEGORIES = ["drinks", "meals", "desserts"] as const;

interface AdminCategoriesPageProps {
  searchParams: Promise<{ main?: string; sub?: string }>;
}

export default async function AdminCategoriesPage({
  searchParams,
}: AdminCategoriesPageProps) {
  const { main: queryMain, sub: querySub } = await searchParams;

  const defaultMain = MAIN_CATEGORIES[0];
  const selectedMain =
    queryMain && queryMain in subTypeEnumMap ? queryMain : defaultMain;

  const validSubOptions =
    subTypeEnumMap[selectedMain as keyof typeof subTypeEnumMap].options;
  const selectedSub =
    querySub && (validSubOptions as readonly string[]).includes(querySub)
      ? querySub
      : validSubOptions[0];

  const allCategories = await getCategories();

  const filtered = allCategories.filter(
    (c) => c.mainCategory === selectedMain && c.subType === selectedSub,
  );

  return (
    <div className="max-w-6xl mx-auto p-6 mt-10 space-y-6">
      <Suspense>
        <ToastHandler />
      </Suspense>

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Categories</h1>
        <Button asChild variant="outline">
          <Link href="/admin/categories/add">
            <PlusCircle className="w-4 h-4 mr-2" />
            Add Category
          </Link>
        </Button>
      </div>

      <Suspense fallback={null}>
        <AdminProductFilter
          selectedMain={selectedMain}
          selectedSub={selectedSub}
        />
      </Suspense>

      {filtered.length === 0 ? (
        <p className="text-center text-muted-foreground py-16">
          No categories in this group yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      )}
    </div>
  );
}