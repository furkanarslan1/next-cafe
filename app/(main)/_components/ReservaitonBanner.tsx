import Image from "next/image";
import React from "react";

export default function ReservaitonBanner() {
  return (
    <div>
      <div className="flex flex-col md:flex-row  md:justify-between md:items-center p-4 bg-linear-to-r from-stone-50 to-stone-300">
        <div className="relative aspect-square w-full">
          <Image
            src="/coffe-image-2.webp"
            alt="reservation-banner-image"
            fill
            className="object-contain"
          />
        </div>
        <div className="space-y-6">
          <div className="flex flex-col gap-2 items-start">
            <h3 className="font-bold text-2xl">
              Let Us Brew the Coffee, You Enjoy the Moment
            </h3>
            <p className="text-sm">
              Carefully selected coffee beans, a calm atmosphere, and a cozy
              table are waiting for you. Whether it’s a long conversation with
              friends or a special moment worth celebrating, make your
              reservation in advance. Enjoy your coffee away from the crowd, at
              a table reserved just for you.
            </p>
          </div>
          <button className="px-4 py-2 text-center border border-black font-bold  hover:bg-black hover:text-white transition-colors cursor-pointer duration-300">
            Rezervation Now
          </button>
        </div>
      </div>
    </div>
  );
}
