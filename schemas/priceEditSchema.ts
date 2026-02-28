import z from "zod";

export const priceEditSchema = z.object({
  price: z.number().positive("Price must be greater than 0"),
  discountRate: z.number().int().min(0).max(100),
  variants: z.array(
    z.object({
      name: z.string(),
      price: z.number().positive("Price must be greater than 0"),
    }),
  ),
});

export type PriceEditFormValues = z.infer<typeof priceEditSchema>;
