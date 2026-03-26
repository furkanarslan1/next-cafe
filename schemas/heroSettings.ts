import z from "zod";

export const brandSchema = z.object({
  brand_name: z
    .string()
    .min(2, "Brand name must at least 2 characters")
    .max(30, "Brand name must be a maximum of 30 characters."),
});

export type BrandNameInput = z.infer<typeof brandSchema>;

export const heroPageSchema = z.object({
  title: z
    .string()
    .min(2, "Title must be at least 2 characters.")
    .max(60, "Title must be a maximum of 60 characters."),
  description: z
    .string()
    .max(120, "Description must be a maximum of 120 characters.")
    .optional(),
  image: z.instanceof(File).optional(),
});

export type HeroPageInput = z.infer<typeof heroPageSchema>;
