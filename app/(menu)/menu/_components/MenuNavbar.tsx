"use client";

import { MENU_CONFIG, getDefaultSubType, MainCategoryKey } from "@/config/menuConfig";
import { Menu } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const PATHNAME_PARAM_MAP: Record<string, { key: MainCategoryKey; param: string }> = {
  "/drinks": { key: "drinks", param: "drinkTemperature" },
  "/meals": { key: "meals", param: "mealType" },
  "/desserts": { key: "desserts", param: "dessertType" },
};

export default function MenuNavbar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const currentEntry = Object.entries(PATHNAME_PARAM_MAP).find(([segment]) =>
    pathname.includes(segment),
  );

  const getNavItems = () => {
    if (!currentEntry) return [];
    const { key } = currentEntry[1];
    return MENU_CONFIG[key].subTypes;
  };

  const getActiveFeature = (): string => {
    if (!currentEntry) return "";
    const { key, param } = currentEntry[1];
    return searchParams.get(param) || getDefaultSubType(key);
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
            key={item.value}
            onClick={() => handleChange(item.value)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              activeFeature === item.value
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
