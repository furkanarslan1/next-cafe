import { createClient } from "@/lib/supabase/server";
import { MainCategory, SubType } from "@/types/menu/MenuTypes";
import { notFound } from "next/navigation";
import ProductAddForm from "../../add/_components/ProductAddForm";

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({
  params,
}: EditProductPageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: product, error } = await supabase
    .from("products")
    .select("*, categories(id, label, slug, main_category, sub_type)")
    .eq("id", id)
    .single();
  if (error || !product) {
    notFound();
  }

  const initialData = {
    id: product.id,
    slug: product.slug,
    title: product.title,
    description: product.description ?? undefined,
    imageUrl: product.image_url ?? undefined,
    imagePublicId: product.image_public_id ?? undefined,
    price: product.price,
    discountRate: product.discount_rate,
    variants: product.variants ?? [],
    categoryId: product.category_id,
    isActive: product.is_active,
    isFeatured: product.is_featured,
    isNew: product.is_new,
    isPopular: product.is_popular,
    isOutOfStock: product.is_out_of_stock,
    calories: product.calories ?? undefined,
    allergens: product.allergens ?? [],
    tags: product.tags ?? [],
    createdAt: product.created_at,
    mainCategory: product.categories.main_category as MainCategory,
    subType: product.categories.sub_type as SubType,
  };
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
      <ProductAddForm initialData={initialData} />
    </div>
  );
}
