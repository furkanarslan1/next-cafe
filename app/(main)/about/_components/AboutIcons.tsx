import React from "react";

import { Store, Coffee, Croissant, Heart, Leaf } from "lucide-react";

const items = [
  {
    icon: Store,
    title: "Est. 2021",
    desc: "Serving great coffee with passion since 2021.",
  },
  {
    icon: Coffee,
    title: "Specialty Coffee",
    desc: "Carefully selected beans with rich, balanced flavors.",
  },
  {
    icon: Croissant,
    title: "Fresh & Daily",
    desc: "Freshly prepared desserts and sandwiches every day.",
  },
  {
    icon: Heart,
    title: "Cozy Atmosphere",
    desc: "A warm, comfortable space to relax and enjoy.",
  },

  {
    icon: Leaf,
    title: "Sustainable Approach",
    desc: "Respecting nature through mindful sourcing and service.",
  },
];

export default function AboutIcons() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex flex-col items-center text-center p-5 rounded-2xl bg-white "
          >
            <item.icon className="mb-3 h-8 w-8 text-amber-600" />
            <h3 className="font-semibold">{item.title}</h3>
            <p className="mt-1 text-sm text-gray-600">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
