import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { StepProps } from "@/types/stepProps";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useState } from "react";

const ALLERGEN_OPTIONS = ["gluten", "milk", "nuts", "soy", "egg"] as const;

export default function StepAttributes({ form }: StepProps) {
  const [tagInput, setTagInput] = useState("");

  const tags = form.watch("tags") ?? [];

  const addTag = () => {
    const trimmed = tagInput.trim();
    if (!trimmed || tags.includes(trimmed)) return;
    form.setValue("tags", [...tags, trimmed]);
    setTagInput("");
  };

  const removeTag = (tag: string) => {
    form.setValue(
      "tags",
      tags.filter((t) => t !== tag),
    );
  };
  return (
    <div className="space-y-6">
      {/* ISFEATURED */}
      <FormField
        control={form.control}
        name="isFeatured"
        render={({ field }) => (
          <FormItem className="flex items-center justify-between rounded-lg border p-4 ">
            <div>
              <FormLabel>Featured</FormLabel>
              <p className="text-sm text-muted-foreground">
                Highlight this product as featured
              </p>
            </div>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
          </FormItem>
        )}
      />

      {/* ISNEW */}
      <FormField
        control={form.control}
        name="isNew"
        render={({ field }) => (
          <FormItem className="flex items-center justify-between rounded-lg border p-4 ">
            <div>
              <FormLabel>New</FormLabel>
              <p className="text-sm text-muted-foreground">
                Mark this product as newly added
              </p>
            </div>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
          </FormItem>
        )}
      />

      {/* ISPOPULAR */}
      <FormField
        control={form.control}
        name="isPopular"
        render={({ field }) => (
          <FormItem className="flex items-center justify-between rounded-lg border p-4 ">
            <div>
              <FormLabel>Popular</FormLabel>
              <p className="text-sm text-muted-foreground">
                Mark this product as popular
              </p>
            </div>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
          </FormItem>
        )}
      />

      {/* ISOUTHOFSTOCK */}
      <FormField
        control={form.control}
        name="isOutOfStock"
        render={({ field }) => (
          <FormItem className="flex items-center justify-between rounded-lg border p-4 ">
            <div>
              <FormLabel>Out of Stock</FormLabel>
              <p className="text-sm text-muted-foreground">
                Mark this product as out of stock
              </p>
            </div>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
          </FormItem>
        )}
      />

      {/* CALORİES */}
      <FormField
        control={form.control}
        name="calories"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Calories</FormLabel>
            <FormControl>
              <Input
                placeholder="e.g 200 calories"
                min={0}
                type="number"
                step="1"
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

      {/* ALLERGENS */}

      <FormField
        control={form.control}
        name="allergens"
        render={() => (
          <FormItem>
            <FormLabel>Allergens</FormLabel>
            <div className="grid grid-cols-2 gap-3 ">
              {ALLERGEN_OPTIONS.map((allergen) => (
                <FormField
                  key={allergen}
                  control={form.control}
                  name="allergens"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(allergen)}
                          onCheckedChange={(checked) => {
                            const current = field.value ?? [];
                            field.onChange(
                              checked
                                ? [...current, allergen]
                                : current.filter((v) => v !== allergen),
                            );
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal capitalize">
                        {allergen}
                      </FormLabel>
                    </FormItem>
                  )}
                />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* TAGS */}
      <div className="space-y-2">
        <FormLabel>Tags</FormLabel>
        <div className=" flex gap-2">
          <Input
            placeholder="e.g vegan,sugar-free"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTag();
              }
            }}
          />
          <Button type="button" variant="outline" onClick={addTag}>
            Add
          </Button>
        </div>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 rounded-full bg-amber-600 px-3 py-1 text-sm"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="hover:text-black"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
