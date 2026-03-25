import { Instagram } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const heroImage = {
  heroImg: "/next-cafe-hero.webp",
  alt: "heroName",
};

const HeroBrand = {
  brandName: "Next Cafe",
};

const heroLinks = {
  instagram: "/instagram",
};

const p = {
  title: "Hello customers",
  desc: "lorem lorem lorem lorem lorem",
};

export default function HeroMenu() {
  return (
    <div className="relative max-w-5xl mx-auto h-50">
      <Image
        src={heroImage.heroImg}
        alt={heroImage.alt}
        fill
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative text-white px-4 py-2">
        <div className="flex justify-between items-center">
          {/* BRAND */}
          <h1 className="font-extrabold text-amber-300">
            {HeroBrand.brandName}
          </h1>
          {/* SOCIAL MEDIA */}
          <div className="flex items-center gap-2 text-xs">
            <p className="">Follow Us</p>
            <ul className="flex items-center gap-2">
              <li>
                <Link href={heroLinks.instagram}>
                  <Instagram className="" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* TITLE AND DESC */}
      <div className="absolute inset-0 flex items-center justify-center text-white">
        <div className="flex flex-col gap-1">
          <p className="font-bold text-sm">{p.title}</p>
          <p className="text-xs">{p.desc}</p>
        </div>
      </div>
    </div>
  );
}
