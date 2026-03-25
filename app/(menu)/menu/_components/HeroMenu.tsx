import { getHeroSettings } from "@/app/(actions)/menuHero/getHeroSettings";
import { Instagram } from "lucide-react";
import Image from "next/image";
import React from "react";

interface HeroMenuProps {
  page: string;
}

export default async function HeroMenu({ page }: HeroMenuProps) {
  const hero = await getHeroSettings(page);
  return (
    <div className="relative max-w-5xl mx-auto h-50">
      <Image
        src={hero.image_url ?? "/next-cafe-hero.webp"}
        alt={hero.title ?? "hero"}
        fill
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative text-white px-4 py-2">
        <div className="flex justify-between items-center">
          {/* BRAND */}
          <h1 className="font-extrabold text-amber-300">
            {hero.brand_name}
          </h1>
          {/* SOCIAL MEDIA */}
          <div className="flex items-center gap-2 text-xs">
            <p className="">Follow Us</p>
            <ul className="flex items-center gap-2">
              <li>
                <a href={hero.instagram_url ?? "#"} target="_blank" rel="noopener noreferrer">
                  <Instagram className="" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* TITLE AND DESC */}
      <div className="absolute inset-0 flex items-center justify-center text-white pointer-events-none">
        <div className="flex flex-col gap-1">
          <p className="font-bold text-sm">{hero.title}</p>
          <p className="text-xs">{hero.description}</p>
        </div>
      </div>
    </div>
  );
}
