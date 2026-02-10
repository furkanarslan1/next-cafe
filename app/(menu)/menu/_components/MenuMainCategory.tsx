import { menuPageLinks } from "@/lib/constanst/menuLinks/menuPageLinks";
import Link from "next/link";
import React from "react";

export default function MenuMainCategory() {
  return (
    <div className=" ">
      <div className="max-w-7xl mx-auto ">
        <div className="grid  grid-cols-1   gap-8 place-items-center  py-4">
          {menuPageLinks.map((menu) => (
            <Link
              href={menu.href}
              key={menu.id}
              className="  bg-white/10 text-stone-300 font-bold shadow-md hover:shadow-stone-300 px-8 py-2 rounded-md transition-all duration-300 h-40 w-40 flex items-center justify-center  "
            >
              <div className="flex flex-col items-center gap-2 ">
                {<menu.icon className="size-10 " />}
                <p> {menu.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
