export type DessertType =
  | "cake"
  | "pastry"
  | "cookie"
  | "ice-cream"
  | "special";

export type DessertsCategoryType = {
  id: number;
  title: string;
  slug: string;
  dessertType: DessertType;
};
