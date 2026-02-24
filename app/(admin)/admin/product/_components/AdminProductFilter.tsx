"use client";

import { subTypeEnumMap } from "@/schemas/menuSchema";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface AdminProductFilterProps {
  selectedMain: string;
  selectedSub: string;
}

const MAIN_CATEGORIES = ["drinks", "meals", "desserts"] as const;

export default function AdminProductFilter({
  selectedMain,
  selectedSub,
}: AdminProductFilterProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleMainClick = (main: string) => {
    const subTypes =
      subTypeEnumMap[main as keyof typeof subTypeEnumMap].options;
    const params = new URLSearchParams(searchParams);
    params.set("main", main);
    params.set("sub", subTypes[0]);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleSubClick = (sub: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("sub", sub);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  // Seçili main'e ait sabit sub tipler — DB'den değil, schema'dan
  // Constant subtypes of the selected main — from the schema, not the DB.
  const subTypes =
    selectedMain in subTypeEnumMap
      ? subTypeEnumMap[selectedMain as keyof typeof subTypeEnumMap].options
      : [];

  return (
    <div className="space-y-3">
      <div className="flex gap-2 flex-wrap">
        {MAIN_CATEGORIES.map((main) => (
          <button
            key={main}
            onClick={() => handleMainClick(main)}
            className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-colors ${
              selectedMain === main
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {main}
          </button>
        ))}
      </div>

      <div className="flex gap-2 flex-wrap pl-2 border-l-2 border-primary/30">
        {subTypes.map((sub) => (
          <button
            key={sub}
            onClick={() => handleSubClick(sub)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${
              selectedSub === sub
                ? "bg-primary/90 text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {sub}
          </button>
        ))}
      </div>
    </div>
  );
}
