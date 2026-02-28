import z from "zod";

export const bulkPriceUpdateSchema = z.object({
  type: z.enum(["fixed_increase", "percent_increase", "percent_discount"]),
  value: z.number().positive("Value must be greater than 0"),
  scope: z.enum(["all", "category"]),
});

export type BulkPriceUpdateValues = z.infer<typeof bulkPriceUpdateSchema>;
