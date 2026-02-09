"use client";

import Image from "next/image";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const galleryImages = [
  { src: "/cafe-gallery/g-1.webp", alt: "Cafe interior view" },
  { src: "/cafe-gallery/g-2.webp", alt: "Coffee preparation" },
  { src: "/cafe-gallery/g-3.webp", alt: "Cozy seating area" },
  { src: "/cafe-gallery/g-4.webp", alt: "Freshly baked pastries" },
  { src: "/cafe-gallery/g-5.webp", alt: "Latte art" },
  { src: "/cafe-gallery/g-6.webp", alt: "Cafe atmosphere" },
];

function GalleryImage({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative aspect-square overflow-hidden rounded-lg group">
      {!loaded && <Skeleton className="absolute inset-0 rounded-lg" />}
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover transition-all duration-500 group-hover:scale-110 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}

export default function CafeGallery() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12 space-y-6">
      <div className="text-center space-y-2">
        <span className="text-sm tracking-[0.3em] uppercase text-amber-600 font-semibold">
          Gallery
        </span>
        <h2 className="text-2xl md:text-3xl font-bold">
          A Glimpse Into Our Cafe
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {galleryImages.map((image) => (
          <GalleryImage key={image.src} src={image.src} alt={image.alt} />
        ))}
      </div>
    </section>
  );
}