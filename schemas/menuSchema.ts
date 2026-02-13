import { z } from "zod";

// ==================== ENUM SEMALARI ====================
// ==================== ENUM SCHEMAS ====================

export const mainCategoryEnum = z.enum(["drinks", "meals", "desserts"]);
export const drinkTemperatureEnum = z.enum(["hot", "cold"]);
export const mealTimeEnum = z.enum(["breakfast", "lunch", "dinner"]);
export const dessertTypeEnum = z.enum([
  "cake",
  "pastry",
  "cookie",
  "ice-cream",
  "special",
]);
const allergenEnum = z.enum(["gluten", "milk", "nuts", "soy", "egg"]);

// Urun varyanti (S/M/L, tek/cift shot vb.)
// Product variant (S/M/L, single/double shot etc.)
const productVariantSchema = z.object({
  name: z.string().min(1, "Variant name is required"),
  price: z.number().positive("Price must be greater than 0"),
});

// mainCategory'ye gore gecerli subType enum'unu doner
// Returns the valid subType enum for the given mainCategory
export const subTypeEnumMap = {
  drinks: drinkTemperatureEnum,
  meals: mealTimeEnum,
  desserts: dessertTypeEnum,
} as const;

// ==================== KATEGORI SEMALARI ====================
// ==================== CATEGORY SCHEMAS ====================

// Kategori olusturma - slug label'dan otomatik uretilir (slugify)
// Create category - slug is auto-generated from label (slugify)
const categoryBaseSchema = z.object({
  label: z.string().min(1, "Category name is required"),
  mainCategory: mainCategoryEnum,
  subType: z.string().min(1, "Sub type is required"),
});

export const createCategorySchema = categoryBaseSchema.refine(
  (data) => {
    const enumValidator = subTypeEnumMap[data.mainCategory];
    return enumValidator.safeParse(data.subType).success;
  },
  {
    message: "Sub type does not match the selected main category",
    path: ["subType"],
  },
);

export const updateCategorySchema = categoryBaseSchema.partial();

// ==================== URUN SEMALARI ====================
// ==================== PRODUCT SCHEMAS ====================

// Urun olusturma - slug title'dan otomatik uretilir (slugify)
// mainCategory ve subType product'ta saklanmaz, category'den turetilir
// Step wizard: mainCategory → subType → category secimi → urun bilgileri → resim
// Create product - slug is auto-generated from title (slugify)
// mainCategory and subType are not stored on product, derived from category
export const createProductSchema = z.object({
  categoryId: z.string().uuid("Invalid category ID"),
  title: z.string().min(1, "Product title is required"),
  description: z.string().optional(),
  price: z.number().positive("Price must be greater than 0"),
  discountRate: z.number().int().min(0).max(100).default(0),
  variants: z.array(productVariantSchema).default([]),
  image: z
    .instanceof(File)
    .refine((file) => file.size <= 5 * 1024 * 1024, "Max file size is 5MB")
    .refine(
      (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      "Only .jpg, .png and .webp formats are allowed",
    ),
  isActive: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
  isNew: z.boolean().default(false),
  isPopular: z.boolean().default(false),
  isOutOfStock: z.boolean().default(false),
  calories: z
    .number()
    .int()
    .nonnegative("Calories cannot be negative")
    .optional(),
  allergens: z.array(allergenEnum).default([]),
  tags: z.array(z.string()).default([]),
});

// Urun guncelleme (tum alanlar opsiyonel)
// Update product (all fields optional)
export const updateProductSchema = createProductSchema.partial();

// ==================== WIZARD SEMASI ====================
// ==================== WIZARD SCHEMA ====================

// Multi-step form: tek form, tum step alanlari icerir
// Step 1: mainCategory (enum secim - DB'ye kaydedilmez, filtreleme icin)
// Step 2: subType (enum secim - DB'ye kaydedilmez, filtreleme icin)
// Step 3: categoryId (DB'ye kaydedilir)
// Step 4: urun bilgileri (title, price, vb.)
// Step 5: resim yukleme
export const productWizardSchema = z.object({
  // Step 1
  mainCategory: mainCategoryEnum,
  // Step 2
  subType: z.string().min(1, "Sub type is required"),
  // Step 3 + createProductSchema alanlari
  categoryId: z.string().uuid("Invalid category ID"),
  title: z.string().min(1, "Product title is required"),
  description: z.string().optional(),
  price: z.number().positive("Price must be greater than 0"),
  discountRate: z.number().int().min(0).max(100).default(0),
  variants: z.array(productVariantSchema).default([]),
  image: z
    .instanceof(File)
    .refine((file) => file.size <= 5 * 1024 * 1024, "Max file size is 5MB")
    .refine(
      (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      "Only .jpg, .png and .webp formats are allowed",
    ),
  isActive: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
  isNew: z.boolean().default(false),
  isPopular: z.boolean().default(false),
  isOutOfStock: z.boolean().default(false),
  calories: z
    .number()
    .int()
    .nonnegative("Calories cannot be negative")
    .optional(),
  allergens: z.array(allergenEnum).default([]),
  tags: z.array(z.string()).default([]),
});

// Her step'te hangi alanlar validate edilecek
// Step 1: Kategori secimi (cascading: mainCategory → subType → categoryId)
// Step 2: Urun bilgileri
// Step 3: Ekstra ozellikler
// Step 4: Resim yukleme → submit
export const WIZARD_STEP_FIELDS: Record<
  number,
  Array<keyof z.infer<typeof productWizardSchema>>
> = {
  1: ["mainCategory", "subType", "categoryId"],
  2: ["title", "description", "price", "discountRate", "variants", "isActive"],
  3: [
    "isFeatured",
    "isNew",
    "isPopular",
    "isOutOfStock",
    "calories",
    "allergens",
    "tags",
  ],
  4: ["image"],
};

export const WIZARD_TOTAL_STEPS = 4;

// ==================== TIP CIKARIMI ====================
// ==================== TYPE INFERENCE ====================

export type MainCategory = z.infer<typeof mainCategoryEnum>;
export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;
export type CreateProductInput = z.infer<typeof createProductSchema>;
export type CreateProductFormInput = z.input<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
export type ProductWizardInput = z.infer<typeof productWizardSchema>;
export type ProductWizardFormInput = z.input<typeof productWizardSchema>;
