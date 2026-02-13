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
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function ProductAddForm() {
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
    defaultValues: {
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
    const validationResult = productWizardSchema.safeParse(values);
    if (!validationResult.success) {
      console.log("Zod Validation Errors:", validationResult.error.format());
      toast.error("Please check the form for errors.");
      return;
    }

    const cleanValues = validationResult.data;
    setIsSubmitting(true);
    try {
      console.log("success", cleanValues);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = async () => {
    const fields = WIZARD_STEP_FIELDS[step];
    if (!fields) return;

    const isValid = await form.trigger(fields);
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
          {/* {step === 1 && <StepCategories form={form} />} */}
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
                <span>{step === 4 ? "Complete and Publish" : "Next Step"}</span>
              </div>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
