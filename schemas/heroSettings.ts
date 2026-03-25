import z from "zod";

export const brandSchema = z.object({
  brand_name: z
    .string()
    .min(2, "Brand name must at least 2 characters")
    .max(30, "Brand name must be a maximum of 30 characters."),
});

export type BrandNameInput = z.input<typeof brandSchema>;
