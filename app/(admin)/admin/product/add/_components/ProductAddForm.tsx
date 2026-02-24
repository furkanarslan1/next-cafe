"use client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  ProductWizardFormInput,
  productWizardSchema,
  WIZARD_STEP_FIELDS,
  WIZARD_TOTAL_STEPS,
} from "@/schemas/menuSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import StepCategories from "./steps/StepCategories";
import StepBasicInfos from "./steps/StepBasicInfos";
import StepAttributes from "./steps/StepAttributes";
import StepImage from "./steps/StepImage";
import { createClient } from "@/lib/supabase/client";
import { createProduct } from "@/app/(actions)/product/createProduct";
import { MainCategory, Product, SubType } from "@/types/menu/MenuTypes";
import { updateProduct } from "@/app/(actions)/product/updateProduct";

interface InitialData extends Product {
  mainCategory: MainCategory;
  subType: SubType;
}

interface ProductAddFormProps {
  initialData?: InitialData;
}

export default function ProductAddForm({ initialData }: ProductAddFormProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const step = Number(searchParams.get("step")) || 1;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setStep = (newStep: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("step", newStep.toString());
    router.push(`?${params.toString()}`);
  };

  const form = useForm<ProductWizardFormInput>({
    resolver: zodResolver(productWizardSchema),
    defaultValues: initialData
      ? {
          mainCategory: initialData.mainCategory,
          subType: initialData.subType,
          categoryId: initialData.categoryId,
          title: initialData.title,
          description: initialData.description ?? "",
          price: initialData.price,
          discountRate: initialData.discountRate,
          variants: initialData.variants,
          image: undefined, // File olarak pre-populate edilemez
          isActive: initialData.isActive,
          isFeatured: initialData.isFeatured,
          isNew: initialData.isNew,
          isPopular: initialData.isPopular,
          isOutOfStock: initialData.isOutOfStock,
          calories: initialData.calories,
          allergens: initialData.allergens,
          tags: initialData.tags,
        }
      : {
          mainCategory: undefined,
          subType: undefined,
          categoryId: undefined,
          title: "",
          description: "",
          price: undefined,
          discountRate: 0,
          variants: [],
          image: undefined,
          isActive: true,
          isFeatured: false,
          isNew: false,
          isPopular: false,
          isOutOfStock: false,
          calories: undefined,
          allergens: [],
          tags: [],
        },
  });

  const onSubmit = async (values: ProductWizardFormInput) => {
    // Add modunda tüm alanları (image dahil) doğrula
    // Edit modunda image opsiyonel — step bazlı validasyon zaten yapıldı
    // In add mode, validate all fields including image
    // In edit mode, image is optional — step-level validation already ran
    if (!initialData) {
      const validationResult = productWizardSchema.safeParse(values);
      if (!validationResult.success) {
        toast.error("Please check the form for errors.");
        return;
      }
    }

    const data = values;
    setIsSubmitting(true);
    try {
      // UX guard: session kontrolü, upload başlamadan önce
      const supabase = createClient();
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();
      if (authError || !user) {
        toast.error("Session expired. Please log in again.");
        router.push("/login");
        return;
      }

      const formData = new FormData();

      if (data.image instanceof File) {
        formData.append("image", data.image);
      }
      formData.append("categoryId", data.categoryId);
      formData.append("title", data.title);
      formData.append("description", data.description ?? "");
      formData.append("price", String(data.price));
      formData.append("discountRate", String(data.discountRate));
      formData.append("variants", JSON.stringify(data.variants));
      formData.append("isActive", String(data.isActive));
      formData.append("isFeatured", String(data.isFeatured));
      formData.append("isNew", String(data.isNew));
      formData.append("isPopular", String(data.isPopular));
      formData.append("isOutOfStock", String(data.isOutOfStock));
      formData.append("allergens", JSON.stringify(data.allergens));
      formData.append("tags", JSON.stringify(data.tags));
      if (data.calories !== undefined) {
        formData.append("calories", String(data.calories));
      }

      let result;

      if (initialData) {
        //edit kısmı mevcut resim bilgilerini geçiyoruz
        formData.append("existingImageUrl", initialData.imageUrl ?? "");
        formData.append(
          "existingImagePublicId",
          initialData.imagePublicId ?? "",
        );

        result = await updateProduct(initialData.id, formData);
      } else {
        result = await createProduct(formData);
      }

      if (!result.success) {
        toast.error(result.error);
        return;
      }

      toast.success(
        initialData
          ? "Product updated successfully."
          : "Product created successfully.",
      );
      router.push("/admin/product");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = async () => {
    const fields = WIZARD_STEP_FIELDS[step];
    if (!fields) return;

    // Edit modunda step 4'te mevcut resim varsa ve yeni resim seçilmediyse image validasyonunu atla — mevcut resim korunuyor
    //In edit mode on step 4, skip image validation if existing image is kept
    const fieldsToValidate =
      step === 4 && initialData?.imageUrl && !form.getValues("image")
        ? (fields as string[]).filter(
            (f) => f !== "image",
          ) as (keyof ProductWizardFormInput)[]
        : fields;

    const isValid = await form.trigger(fieldsToValidate);
    if (!isValid) return;

    if (step < WIZARD_TOTAL_STEPS) {
      setStep(step + 1);
    } else {
      await onSubmit(form.getValues());
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto p-6 mb-12">
      <div className="flex items-center gap-2 mb-4">
        {[1, 2, 3, 4].map((s) => (
          <div
            key={s}
            className={`h-2 flex-1 rounded-full ${
              s <= step ? "bg-primary" : "bg-muted"
            }`}
          />
        ))}
      </div>
      <Form {...form}>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
          {step === 1 && <StepCategories form={form} />}
          {step === 2 && <StepBasicInfos form={form} />}
          {step === 3 && <StepAttributes form={form} />}
          {step === 4 && (
            <StepImage form={form} existingImageUrl={initialData?.imageUrl} />
          )}
          <div className="flex justify-between pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep(step - 1)}
              disabled={step === 1 || isSubmitting}
            >
              Previous
            </Button>
            <Button type="button" onClick={handleNext} disabled={isSubmitting}>
              <div className="flex items-center justify-center">
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                <span>
                  {step === 4
                    ? initialData
                      ? "Save Changes"
                      : "Complete and Publish"
                    : "Next Step"}
                </span>
              </div>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
