import Image from "next/image";
import React from "react";

export default function HomeAbout() {
  return (
    <div className="relative h-[80vh] w-full">
      <Image
        src="/home-about-image.webp"
        alt="home-about-image"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/80"></div>

      <div className="relative z-10 text-stone-200 h-full w-full flex items-center justify-center max-w-4xl mx-auto p-4">
        <div className="flex flex-col items-center gap-8">
          <span className="border-b-2 border-amber-400 font-extrabold">
            OUR STORY
          </span>
          <h2 className="font-bold">
            A Cozy Corner for Good Coffee & Good Moments
          </h2>
          <p className="text-base">
            Born from a love for simple moments and well-brewed coffee, our café
            is a place to pause, connect, and enjoy. Whether you come alone or
            with friends, there’s always a seat waiting for you.
          </p>
        </div>
      </div>
    </div>
  );
}
