"use client";

import { getByMainSubCategories } from "@/app/(actions)/category/getByMainSubCategories";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  mainCategoryEnum,
  ProductWizardFormInput,
  subTypeEnumMap,
} from "@/schemas/menuSchema";
import { StepProps } from "@/types/stepProps";
import { useEffect, useRef, useState } from "react";
import { UseFormReturn } from "react-hook-form";

interface Category {
  id: string;
  label: string;
}

export default function StepCategories({ form }: StepProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const watchMain = form.watch("mainCategory");
  const watchSub = form.watch("subType");

  // null = henüz set edilmedi (ilk render), undefined/string = önceki değer
  // null = not yet set (first render), undefined/string = previous value
  const prevMainRef = useRef<string | null | undefined>(null);
  const prevSubRef = useRef<string | null | undefined>(null);

  // mainCategory değişince subType ve categoryId sıfırla
  // Resets subType and categoryId when mainCategory changes
  // İlk render'da (null) atla — sonraki değişimlerde gerçek değeri karşılaştır
  // Skip on first render (null) — on subsequent changes compare actual values
  useEffect(() => {
    if (prevMainRef.current === null) {
      prevMainRef.current = watchMain;
      return;
    }
    if (prevMainRef.current !== watchMain) {
      prevMainRef.current = watchMain;
      form.setValue("subType", "");
      form.setValue("categoryId", "");
      setCategories([]);
    }
  }, [watchMain]);

  // subType değişince categoryId sıfırla ve DB'den kategorileri çek
  // When subType changes, reset categoryId and fetch categories from DB
  // İlk render'da categoryId sıfırlanmaz, sadece kategoriler çekilir
  // On first render, categoryId is not reset — only categories are fetched
  useEffect(() => {
    if (prevSubRef.current === null) {
      prevSubRef.current = watchSub;
      if (watchMain && watchSub) {
        const fetchCategories = async () => {
          setIsLoading(true);
          const data = await getByMainSubCategories(watchMain, watchSub);
          setCategories(data ?? []);
          setIsLoading(false);
        };
        fetchCategories();
      }
      return;
    }

    if (prevSubRef.current !== watchSub) {
      prevSubRef.current = watchSub;
      form.setValue("categoryId", "");

      if (!watchMain || !watchSub) {
        setCategories([]);
        return;
      }

      const fetchCategories = async () => {
        setIsLoading(true);
        const data = await getByMainSubCategories(watchMain, watchSub);
        setCategories(data ?? []);
        setIsLoading(false);
      };
      fetchCategories();
    }
  }, [watchSub]);

  return (
    <div className="space-y-6">
      {/* 1. Main Category */}
      <FormField
        control={form.control}
        name="mainCategory"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Main Category</FormLabel>
            <Select onValueChange={field.onChange} value={field.value ?? ""}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select main category" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {mainCategoryEnum.options.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* 2. Sub Type */}
      <FormField
        control={form.control}
        name="subType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Sub Type</FormLabel>
            <Select
              onValueChange={field.onChange}
              value={field.value ?? ""}
              disabled={!watchMain}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select sub type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {watchMain &&
                  subTypeEnumMap[watchMain]?.options.map((sub) => (
                    <SelectItem key={sub} value={sub}>
                      {sub}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* 3. Category */}
      <FormField
        control={form.control}
        name="categoryId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Category</FormLabel>
            <Select
              onValueChange={field.onChange}
              value={field.value ?? ""}
              disabled={!watchSub || isLoading}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue
                    placeholder={
                      isLoading ? "Loading categories..." : "Select category"
                    }
                  />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
