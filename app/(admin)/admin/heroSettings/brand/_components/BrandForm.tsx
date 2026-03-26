"use client";

import { createBrandName } from "@/app/(actions)/menuHero/createBrandName";
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
import { BrandNameInput, brandSchema } from "@/schemas/heroSettings";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface BrandFormProps {
  defaultBrandName: string;
}

export default function BrandForm({ defaultBrandName }: BrandFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<BrandNameInput>({
    resolver: zodResolver(brandSchema),
    defaultValues: {
      brand_name: defaultBrandName,
    },
  });

  const onSubmit = async (value: BrandNameInput) => {
    setIsSubmitting(true);
    try {
      const result = await createBrandName(value);
      if (!result.success) {
        toast.error(result.error);
        return;
      }
      toast.success("Brand name updated successfully.");
      router.push("/admin/heroSettings");
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
            name="brand_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Brand Name</FormLabel>
                <FormControl>
                  <Input
                    id="brand-ame-input"
                    placeholder="e.g next cafe"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" variant="default" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 /> : "Create Brand Name"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
