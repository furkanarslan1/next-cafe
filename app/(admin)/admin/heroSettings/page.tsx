import Link from "next/link";
import { Tag, Instagram, ImageIcon } from "lucide-react";

const heroSettingsCards = [
  {
    title: "Brand Name",
    description: "Update the cafe brand name shown on all hero sections.",
    href: "/admin/heroSettings/brand",
    icon: Tag,
    gradient: "from-amber-400 to-orange-500",
  },
  {
    title: "Social Media",
    description: "Update the Instagram URL shown on all hero sections.",
    href: "/admin/heroSettings/socialMedia",
    icon: Instagram,
    gradient: "from-pink-500 to-rose-500",
  },
  {
    title: "Drinks Hero",
    description: "Update the hero image, title and description for the drinks page.",
    href: "/admin/heroSettings/drinks",
    icon: ImageIcon,
    gradient: "from-sky-400 to-blue-600",
  },
  {
    title: "Meals Hero",
    description: "Update the hero image, title and description for the meals page.",
    href: "/admin/heroSettings/meals",
    icon: ImageIcon,
    gradient: "from-green-400 to-emerald-600",
  },
  {
    title: "Desserts Hero",
    description: "Update the hero image, title and description for the desserts page.",
    href: "/admin/heroSettings/desserts",
    icon: ImageIcon,
    gradient: "from-purple-400 to-violet-600",
  },
];

export default function HeroSettingPage() {
  return (
    <div className="max-w-4xl mx-auto my-16 px-4">
      <h1 className="text-2xl font-bold mb-2">Hero Settings</h1>
      <p className="text-muted-foreground text-sm mb-8">
        Manage the hero sections across the menu pages.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {heroSettingsCards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="flex items-start gap-4 border border-stone-200 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-stone-300 transition-all"
          >
            <div className={`p-2 bg-gradient-to-br ${card.gradient} rounded-xl`}>
              <card.icon className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-semibold">{card.title}</p>
              <p className="text-sm text-muted-foreground mt-0.5">{card.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
