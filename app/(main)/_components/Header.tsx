"use client";
import { navLinks } from "@/lib/constanst/navLinks";
import { socialLinks } from "@/lib/constanst/socialLinks";
import { cn } from "@/lib/utils";
import { Coffee } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Header() {
  const pathname = usePathname();

  return (
    <div className="h-16 w-full flex items-center justify-center md:justify-between  px-6 mx-auto bg-transparent backdrop-blur-lg ">
      {/* BRAND */}
      <Link
        href="/"
        className="flex items-center gap-2 px-4 py-2  text-amber-800"
      >
        <Coffee className=" font-extrabold " />
        <p className=" font-bold">Next Cafe</p>
      </Link>
      {/* NAV LINKS */}
      <div className="hidden md:flex items-center gap-4">
        {navLinks.map((nav) => {
          const isActive = pathname.startsWith(nav.href);

          return (
            <Link
              href={nav.href}
              key={nav.href}
              className={cn(
                "relative group py-1 transition-colors",
                isActive ? "text-amber-800 font-bold" : "text-amber-900/70",
              )}
            >
              {nav.label}
              <span
                className={cn(
                  "absolute left-1/2 bottom-0 h-0.5 bg-amber-800 transition-all duration-500",
                  isActive
                    ? "w-full left-0"
                    : "w-0 group-hover:w-full group-hover:left-0",
                )}
              />
            </Link>
          );
        })}
      </div>
      {/* SOCİAL LINKS */}
      <div className="hidden md:flex items-center gap-2">
        {socialLinks.map((social) => (
          <Link href={social.href} key={social.href} target="_blank">
            <social.icon className="size-5 text-amber-800" />
          </Link>
        ))}
      </div>
    </div>
  );
}
