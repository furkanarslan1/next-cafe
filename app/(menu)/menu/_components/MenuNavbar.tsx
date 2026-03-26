"use client";

import { Menu } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type NavItem = {
  feature: string;
  label: string;
};

export default function MenuNavbar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const getNavItems = (): NavItem[] => {
    if (pathname.includes("/drinks")) {
      return [
        { feature: "hot", label: "Hot" },
        { feature: "cold", label: "Cold" },
      ];
    }
    if (pathname.includes("/meals")) {
      return [
        { feature: "breakfast", label: "Breakfast" },
        { feature: "lunch", label: "Lunch" },
        { feature: "dinner", label: "Dinner" },
      ];
    }
    if (pathname.includes("/desserts")) {
      return [
        { feature: "cake", label: "Cake" },
        { feature: "pastry", label: "Pastry" },
        { feature: "cookie", label: "Cookie" },
        { feature: "ice-cream", label: "Ice Cream" },
        { feature: "special", label: "Special" },
      ];
    }
    return [];
  };

  const getActiveFeature = (): string => {
    if (pathname.includes("/drinks"))
      return searchParams.get("drinkTemperature") || "hot";
    if (pathname.includes("/meals"))
      return searchParams.get("mealType") || "breakfast";
    if (pathname.includes("/desserts"))
      return searchParams.get("dessertType") || "cake";
    return "";
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
  const activeFeature = getActiveFeature();

  if (items.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-fit bg-linear-to-t from-black to-black/40 h-16 z-30 text-white rounded-xl border border-slate-300 flex items-center justify-center">
      <div className="relative flex items-center gap-2 text-xl px-4">
        <button onClick={() => router.push("/menu")}>
          <Menu className="size-5" />
        </button>
        {items.map((item) => (
          <button
            key={item.feature}
            onClick={() => handleChange(item.feature)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              activeFeature === item.feature
                ? "border border-white/60 shadow-[0_0_8px_rgba(255,255,255,0.4)] bg-white/10"
                : "opacity-70 hover:opacity-100"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
