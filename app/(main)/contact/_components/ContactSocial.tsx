import { socialLinks } from "@/lib/constanst/socialLinks";
import Link from "next/link";
import React from "react";

export default function ContactSocial() {
  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4 ">
      <h4 className="text-2xl font-extrabold ">Follow Us</h4>
      <div className="flex items-center justify-center gap-6">
        {socialLinks.map((s) => (
          <Link key={s.href} target="_blank" href={s.href}>
            {
              <s.icon className="size-10 md:size-20 text-stone-200 bg-stone-800 hover:bg-stone-200 hover:text-stone-800 transition-color duration-300 cursor-pointer p-2 rounded-md" />
            }
          </Link>
        ))}
      </div>
    </div>
  );
}
