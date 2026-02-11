// Drinks special
export type DrinkTemperature = "hot" | "cold";

// Category (flat, no nesting)
export type DrinksCategoryType = {
  id: number;
  title: string;
  slug: string;
  drinkTemperature: DrinkTemperature;
};
