"use client";

import { updateProductPrice } from "@/app/(actions)/price/updateProductPrice";
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
  PriceEditFormValues,
  priceEditSchema,
} from "@/schemas/priceEditSchema";
import { Product } from "@/types/menu/MenuTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";

interface PriceEditFormProps {
  product: Product;
  onClose: () => void;
}

export default function PriceEditForm({
  product,
  onClose,
}: PriceEditFormProps) {
  const form = useForm<PriceEditFormValues>({
    resolver: zodResolver(priceEditSchema),
    defaultValues: {
      price: product.price,
      discountRate: product.discountRate,
      variants: product.variants,
    },
  });

  const { fields } = useFieldArray({
    control: form.control,
    name: "variants",
  });

  const onSubmit = async (values: PriceEditFormValues) => {
    const result = await updateProductPrice(product.id, values);
    if (result.success) {
      toast.success("Price updated successfully");
      onClose();
    } else {
      toast.error(result.error ?? "An error acurred.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-4">
        {/* BASE PRICE */}
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Base Price</FormLabel>
              <FormControl>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                    $
                  </span>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    className="pl-7"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* DISCOUNT RATE */}
        <FormField
          control={form.control}
          name="discountRate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Discount Rate</FormLabel>
              <FormControl>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                    %
                  </span>
                  <Input
                    type="number"
                    step="1"
                    min="0"
                    max="100"
                    className="pl-7"
                    {...field}
                    onChange={(e) =>
                      field.onChange(parseInt(e.target.value, 10))
                    }
                  />
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        {/* VARIANTS */}
        {fields.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium">Variants</p>
            {fields.map((field, index) => (
              <FormField
                key={field.id}
                control={form.control}
                name={`variants.${index}.price`}
                render={({ field: priceField }) => (
                  <FormItem>
                    <div className="flex items-center gap-3">
                      <FormLabel> {field.name}</FormLabel>
                      <FormControl>
                        <div className="relative flex-1">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                            ₺
                          </span>
                          <Input
                            type="number"
                            step="0.01"
                            min="0"
                            className="pl-7"
                            {...priceField}
                            onChange={(e) =>
                              priceField.onChange(parseFloat(e.target.value))
                            }
                          />
                        </div>
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>
        )}
        <div className="flex gap-2 pt-2">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button type="submit" className="flex-1">
            {form.formState.isSubmitting ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
