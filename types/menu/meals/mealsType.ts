// Meals special
export type MealType = "breakfast" | "lunch" | "dinner";

export type MealsCategoryType = {
  id: number;
  title: string;
  slug: string;
  mealType: MealType;
};
