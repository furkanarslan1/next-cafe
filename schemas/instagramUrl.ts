import z from "zod";

export const instagramUrlSchema = z.object({
  instagram_url: z
    .string()
    .url("Please enter a valid URL.")
    .refine((val) => val.includes("instagram.com"), {
      message: "URL must be an Instagram link.",
    }),
});

export type InstagramUrlInput = z.infer<typeof instagramUrlSchema>;