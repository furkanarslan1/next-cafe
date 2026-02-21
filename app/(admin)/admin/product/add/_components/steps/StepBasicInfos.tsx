import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { StepProps } from "@/types/stepProps";
import { Plus, Trash2 } from "lucide-react";
import React from "react";
import { useFieldArray } from "react-hook-form";

export default function StepBasicInfos({ form }: StepProps) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "variants",
  });
  return (
    <div className="space-y-6">
      {/* TITLE */}
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input placeholder="Enter product title" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* DESCRIPTON */}

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Enter product description"
                rows={3}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* PRICE */}

      <FormField
        control={form.control}
        name="price"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Price</FormLabel>
            <FormControl>
              <Input
                placeholder="0.00"
                type="number"
                step="0.01"
                {...field}
                value={field.value ?? ""}
                onChange={(e) => {
                  const val = e.target.valueAsNumber;
                  field.onChange(Number.isNaN(val) ? undefined : val);
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* DiscountRate */}

      <FormField
        control={form.control}
        name="discountRate"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Discount Rate (%)</FormLabel>
            <FormControl>
              <Input
                placeholder="0"
                type="number"
                max={100}
                min={0}
                {...field}
                value={field.value ?? ""}
                onChange={(e) => {
                  const val = e.target.valueAsNumber;
                  field.onChange(Number.isNaN(val) ? undefined : val);
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Variants */}

      <div className="space-y-4">
        <FormLabel>Variants</FormLabel>
        {fields.map((item, index) => (
          <div key={item.id} className="flex items-end gap-3">
            <FormField
              control={form.control}
              name={`variants.${index}.name`}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className={index > 0 ? "sr-only" : ""}>
                    Variant Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g Small, Medium, Large"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`variants.${index}.price`}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className={index > 0 ? "sr-only" : ""}>
                    Price
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="0.00"
                      type="number"
                      step="0.01"
                      {...field}
                      onChange={(e) =>
                        field.onChange(e.target.valueAsNumber)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => remove(index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          onClick={() => append({ name: "", price: 0 })}
          className="w-full"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Variant
        </Button>
      </div>

      {/* isActive */}
      <FormField
        control={form.control}
        name="isActive"
        render={({ field }) => (
          <FormItem className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <FormLabel>Active</FormLabel>
              <p className="text-sm text-muted-foreground">
                Product will be visible to customers
              </p>
            </div>

            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
}
