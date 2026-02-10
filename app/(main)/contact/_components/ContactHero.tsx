import Image from "next/image";
import React from "react";

export default function ContactHero() {
  return (
    <div className="relative h-[40vh] w-full">
      <Image
        src="/cafe-gallery/g-1.webp"
        alt="about-hero-image"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="relative h-full w-full flex items-center justify-center text-stone-300 ">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-md font-semibold border-b-2 border-amber-600 pb-1 text-center w-fit">
            Contact Us
          </h1>
          <p className="text-2xl md:text-4xl font-extrabold">
            Come by, call us, or send a message.
          </p>
        </div>
      </div>
    </div>
  );
}
