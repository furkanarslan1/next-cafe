"use client";

import { bulkUpdatePrices } from "@/app/(actions)/price/bulkUpdatePrices";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  bulkPriceUpdateSchema,
  BulkPriceUpdateValues,
} from "@/schemas/bulkPriceUpdateSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface BulkPriceUpdateFormProps {
  categoryIds: string[];
  onClose: () => void;
}

export default function BulkPriceUpdateForm({
  categoryIds,
  onClose,
}: BulkPriceUpdateFormProps) {
  const form = useForm<BulkPriceUpdateValues>({
    resolver: zodResolver(bulkPriceUpdateSchema),
    defaultValues: {
      type: "fixed_increase",
      value: 0,
      scope: "all",
    },
  });

  const selectedType = form.watch("type");
  const prefix = selectedType === "fixed_increase" ? "$" : "%";
  const onSubmit = async (values: BulkPriceUpdateValues) => {
    const result = await bulkUpdatePrices(values, categoryIds);
    if (result.success) {
      toast.success("Prices updated successfully");
      onClose();
    } else {
      toast.error(result.error ?? "An error occurred.");
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-4">
        {/* TYPE */}
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Operation Type</FormLabel>
              <FormControl>
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="space-y-1 mt-1"
                >
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="fixed_increase" id="fixed" />
                    <label htmlFor="fixed" className="text-sm cursor-pointer">
                      Fixed Increase $
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="percent_increase" id="percent_inc" />

                    <label
                      htmlFor="percent_inc"
                      className="text-sm cursor-pointer"
                    >
                      Percent Increase (%)
                    </label>
                  </div>

                  <div className="flex items-center gap-2">
                    <RadioGroupItem
                      value="percent_discount"
                      id="percent_disc"
                    />

                    <label
                      htmlFor="percent_disc"
                      className="text-sm cursor-pointer"
                    >
                      Set Discount Rate (%)
                    </label>
                  </div>
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />

        {/* VALUE */}
        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Value</FormLabel>
              <FormControl>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                    {prefix}
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
        {/* SCOPE */}
        <FormField
          control={form.control}
          name="scope"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Apply To</FormLabel>
              <FormControl>
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="space-y-1 mt-1"
                >
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="all" id="all" />
                    <label htmlFor="all" className="text-sm cursor-pointer">
                      All products
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="category" id="category" />
                    <label
                      htmlFor="category"
                      className="text-sm cursor-pointer"
                    >
                      Current category only
                    </label>
                  </div>
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex gap-2 pt-2">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="flex-1"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Applying..." : "Apply"}{" "}
          </Button>
        </div>
      </form>
    </Form>
  );
}
