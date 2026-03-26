/**
 * MENU CONFIGURATION — Single source of truth
 *
 * When deploying for a different cafe:
 *   - Add/remove subTypes per main category
 *   - Change labels freely
 *   - Then run a DB migration to update the `sub_type` column values accordingly
 *
 * Everything in the app (schema validation, navbar, filters, forms) derives from this file.
 * No other file needs to be touched for sub-type changes.
 */

export const MENU_CONFIG = {
  drinks: {
    label: "Drinks",
    subTypes: [
      { value: "hot", label: "Hot" },
      { value: "cold", label: "Cold" },
    ],
  },
  meals: {
    label: "Meals",
    subTypes: [
      { value: "breakfast", label: "Breakfast" },
      { value: "lunch", label: "Lunch" },
      { value: "dinner", label: "Dinner" },
    ],
  },
  desserts: {
    label: "Desserts",
    subTypes: [
      { value: "cake", label: "Cake" },
      { value: "pastry", label: "Pastry" },
      { value: "cookie", label: "Cookie" },
      { value: "ice-cream", label: "Ice Cream" },
      { value: "special", label: "Special" },
    ],
  },
} as const;

export type MainCategoryKey = keyof typeof MENU_CONFIG;
export const MAIN_CATEGORIES = Object.keys(MENU_CONFIG) as MainCategoryKey[];

/** Returns the subType entries for a given main category */
export function getSubTypes(main: MainCategoryKey) {
  return MENU_CONFIG[main].subTypes;
}

/** Returns only the subType values (for validation/filtering) */
export function getSubTypeValues(main: MainCategoryKey) {
  return MENU_CONFIG[main].subTypes.map((s) => s.value);
}

/** Returns the label for a given subType value */
export function getSubTypeLabel(main: MainCategoryKey, value: string): string {
  const found = MENU_CONFIG[main].subTypes.find((s) => s.value === value);
  return found?.label ?? value;
}

/** Returns the first subType value for a given main category (used as default) */
export function getDefaultSubType(main: MainCategoryKey) {
  return MENU_CONFIG[main].subTypes[0].value;
}