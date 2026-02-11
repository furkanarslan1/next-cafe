import Image from "next/image";
import React from "react";

export default function MenuHero() {
  return (
    <div className="relative h-[20vh] w-full">
      <Image
        src="/next-cafe-hero.webp"
        alt="about-hero-image"
        fill
        className="object-cover object-bottom"
      />
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="relative h-full w-full flex items-center justify-center text-stone-300 p-4">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-md font-semibold border-b-2 border-amber-600 pb-1 text-center w-fit">
            Menu
          </h1>
          <p className="text-xl md:text-4xl font-extrabold">
            Crafted Drinks & Fresh Bites
          </p>
        </div>
      </div>
    </div>
  );
}
