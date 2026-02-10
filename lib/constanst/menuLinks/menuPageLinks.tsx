import { MenuPageLinksType } from "@/types/MenuTypes";
import {
  Cake,
  CakeSlice,
  Coffee,
  Dessert,
  DessertIcon,
  Utensils,
} from "lucide-react";

export const menuPageLinks: MenuPageLinksType[] = [
  {
    id: 1,
    slug: "drinks",
    title: "Drinks",
    href: "/menu/drinks",
    icon: Coffee,
  },
  {
    id: 2,
    slug: "meals",
    title: "Meals",
    href: "/menu/meals",
    icon: Utensils,
  },
  {
    id: 3,
    slug: "desserts",
    title: "Desserts",
    href: "/menu/desserts",
    icon: CakeSlice,
  },
];
