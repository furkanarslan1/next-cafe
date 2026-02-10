import Image from "next/image";
import React from "react";

export default function AboutTeam() {
  return (
    <div className=" bg-stone-800 p-4 ">
      <div className="flex flex-col md:flex-row gap-6 max-w-7xl mx-auto p-6">
        <div className="relative h-80 w-full">
          <Image
            src="/about/barista.webp"
            alt="about-description-image"
            fill
            className="object-cover rounded-2xl shadow-2xl -rotate-2 z-10"
          />
          <div className="absolute left-5 md:left-10 h-full w-full bg-stone-600 rotate-2 "></div>
        </div>
        <div className="text-stone-300 space-y-6 z-10">
          <h1 className="text-2xl font-bold">Made by People Who Care</h1>
          <p>
            Behind every cup is a team that truly enjoys what they do. From
            preparing your coffee to welcoming you in, we care about the small
            details that make each visit feel familiar and warm.
          </p>
        </div>
      </div>
    </div>
  );
}
