import Image from "next/image";
import Link from "next/link";
import {
  Coffee,
  UtensilsCrossed,
  Croissant,
  CakeSlice,
  Wine,
  Clock,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const cafeFeatures = [
  { label: "Coffee", icon: Coffee },
  { label: "Restaurant", icon: UtensilsCrossed },
  { label: "Bakery", icon: Croissant },
  { label: "Desserts", icon: CakeSlice },
  { label: "Wine Bar", icon: Wine },
  { label: "Open Daily", icon: Clock },
  { label: "Top Rated", icon: Star },
];

export default function HomeHero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* BACKGROUND IMAGE*/}
      <Image
        src="/next-cafe-hero.webp"
        alt="Next Cafe interior"
        fill
        priority
        className="object-cover"
      />

      {/* GRADIENT OVERLAY */}
      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/40 to-black/20" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
        {/* Accent Tag */}
        <div className="flex items-center gap-2 mb-6">
          <span className="h-px w-8 bg-amber-400" />
          <span className="text-sm tracking-[0.3em] uppercase text-amber-400">
            Est. 2024
          </span>
          <span className="h-px w-8 bg-amber-400" />
        </div>

        {/* HEADING */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
          Next Cafe
        </h1>

        {/* TAGLINE */}
        <p className="mt-4 max-w-lg text-lg md:text-xl text-white/80 italic">
          Where every cup tells a story
        </p>

        {/* BUTTON */}
        <Button
          asChild
          size="lg"
          className="mt-8 rounded-full bg-amber-400 px-8 text-black hover:bg-amber-300 transition-colors"
        >
          <Link href="/menu">Explore Our Menu</Link>
        </Button>
      </div>

      {/* BOTTOM FEATURES */}
      <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-white/10 bg-black/30 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4 overflow-x-auto gap-6">
          {cafeFeatures.map(({ label, icon: Icon }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-1.5 min-w-fit"
            >
              <Icon className="size-5 text-amber-400" strokeWidth={1.5} />
              <span className="text-xs tracking-wide text-white/70">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
