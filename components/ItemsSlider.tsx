"use client";

import { ItemType } from "@/types/ItemsType";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

interface ItemsSliderProps {
  items: ItemType[];
  sliderId: string;
}

export default function ItemsSlider({ items, sliderId }: ItemsSliderProps) {
  const prevClass = `${sliderId}-prev`;
  const nextClass = `${sliderId}-next`;
  return (
    <div className="max-w-7xl mx-auto space-y-4">
      <div className="relative">
        <button
          className={`${prevClass} absolute left-0 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center text-black cursor-pointer hover:scale-110 transition-transform`}
        >
          <ChevronLeft size={40} />
        </button>
      </div>
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        loop={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true, dynamicBullets: true }}
        navigation={{ prevEl: `.${prevClass}`, nextEl: `${nextClass}` }}
        spaceBetween={10}
        slidesPerView={1}
      >
        {items.map((item) => (
          <SwiperSlide key={item.id}></SwiperSlide>
        ))}
      </Swiper>
      <button
        className={`${nextClass} absolute right-0 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center text-black cursor-pointer hover:scale-110 transition-transform`}
      >
        <ChevronRight size={40} />
      </button>
    </div>
  );
}
