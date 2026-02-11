"use client";

import {
  Cake,
  CakeSlice,
  Coffee,
  Egg,
  IceCream,
  LucideIcon,
  Menu,
  Sandwich,
  Utensils,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type NavItem = {
  feature: string;
  icon: LucideIcon;
};

export default function MenuNavbar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const getNavItems = (): NavItem[] => {
    if (pathname.includes("/drinks")) {
      return [
        { feature: "hot", icon: Coffee },
        { feature: "cold", icon: IceCream },
      ];
    }
    if (pathname.includes("/meals")) {
      return [
        { feature: "breakfast", icon: Egg },
        { feature: "lunch", icon: Sandwich },
        { feature: "dinner", icon: Utensils },
      ];
    }
    if (pathname.includes("/desserts")) {
      return [
        { feature: "cakes", icon: Cake },
        { feature: "pastry", icon: CakeSlice },
      ];
    }
    return [];
  };

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (pathname.includes("/drinks")) {
      params.set("drinkTemperature", value);
    } else if (pathname.includes("/meals")) {
      params.set("mealType", value);
    } else if (pathname.includes("/desserts")) {
      params.set("dessertType", value);
    }

    params.delete("category");
    router.push(`${pathname}?${params.toString()}`);
  };

  const items = getNavItems();
  if (items.length === 0) return null;
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-fit bg-linear-to-t from-black to-black/40 h-16 z-30 text-white rounded-xl border border-slate-300 flex items-center justify-center">
      <div className="relative flex items-center gap-8 text-xl px-4">
        <button className="" onClick={() => router.push("/menu")}>
          <Menu className="size-10" />
        </button>
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.feature}
              onClick={() => handleChange(item.feature)}
              className="relative z-10 p-2 rounded-xl"
            >
              <div>
                <Icon className="size-10" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
