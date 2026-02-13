"use client";
import { addCategoryAction } from "@/app/(actions)/category/addCategoryAction";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CreateCategoryInput,
  createCategorySchema,
  mainCategoryEnum,
  subTypeEnumMap,
} from "@/schemas/menuSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function AddCategoryForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const form = useForm<CreateCategoryInput>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      label: "",
      mainCategory: "drinks",
      subType: "",
    },
  });
  const watchMainCategory = form.watch("mainCategory");
  useEffect(() => {
    form.setValue("subType", "");
  }, [watchMainCategory]);

  const onSubmit = async (values: CreateCategoryInput) => {
    setIsSubmitting(true);
    try {
      const result = await addCategoryAction(values);
      if (!result.success) {
        toast.error(result.error);
        return;
      }
      form.reset();
      router.push("/admin/categories?message=CategoryCreated");
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="max-w-6xl mx-auto p-4 ">
      <Form {...form}>
        <form
          className="space-y-8 border border-stone-200 rounded-2xl p-6 shadow-md"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="label"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Label</FormLabel>
                <FormControl>
                  <Input
                    id="category-add-form-label"
                    placeholder="e.g Cold Coffee"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="mainCategory"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Main Category</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {mainCategoryEnum.options?.map((cat, i) => (
                      <SelectItem key={i} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="subType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sub Category</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Sub Category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {subTypeEnumMap[watchMainCategory]?.options.map(
                      (subCat, i) => (
                        <SelectItem key={i} value={subCat}>
                          {subCat}
                        </SelectItem>
                      ),
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" variant="outline" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 /> : " Create a Category"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
