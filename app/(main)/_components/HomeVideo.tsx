"use client";

import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function HomeVideo() {
  const [loaded, setLoaded] = useState(false);

  return (
    <section className="md:w-7xl w-full mx-auto md:px-4 md:py-12 space-y-6">
      <div className="relative md:rounded-lg overflow-hidden">
        {!loaded && (
          <Skeleton className="absolute inset-0 md:rounded-lg aspect-video" />
        )}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className={`w-full h-auto transition-opacity duration-500 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          onCanPlay={() => setLoaded(true)}
        >
          <source src="/latte-video.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40">
          <span className="text-sm tracking-[0.3em] uppercase text-amber-400 font-semibold">
            Experience
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Feel the Atmosphere
          </h2>
        </div>
      </div>
    </section>
  );
}
