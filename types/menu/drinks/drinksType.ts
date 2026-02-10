// Main category
export type MainCategory = "drinks" | "meals" | "desserts";

// Drinks special
export type DrinkTemperature = "hot" | "cold";
export type DrinkType = "coffee" | "tea" | "other";

// Category tree (visitor read-only)
export type CategoryTreeType = {
  id: number;
  title: string;
  slug: string;
  children?: CategoryTreeType[];
};

// Product
export type DrinkProductType = {
  id: number;
  slug: string;

  title: string;
  description?: string;
  price: number;
  image?: string;

  mainCategory: MainCategory;

  drinkTemperature?: DrinkTemperature;
  drinkType?: DrinkType;

  isActive: boolean;
  createdAt: string;

  displayOrder?: number;
};
