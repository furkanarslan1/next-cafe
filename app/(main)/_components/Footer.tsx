import { navLinks } from "@/lib/constanst/navLinks";
import { socialLinks } from "@/lib/constanst/socialLinks";
import { Coffee } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-stone-600 text-stone-300">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center justify-center md:justify-start gap-2 text-white">
              <Coffee />
              <span className="font-bold text-lg">Next Cafe</span>
            </Link>
            <p className="text-sm leading-relaxed">
              Where every cup tells a story. Carefully crafted coffee, fresh
              pastries, and a warm atmosphere since 2024.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Quick Links</h3>
            <nav className="flex flex-col items-center md:items-start gap-2">
              {navLinks.map((nav) => (
                <Link
                  key={nav.href}
                  href={nav.href}
                  className="text-sm hover:text-white transition-colors w-fit"
                >
                  {nav.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Opening Hours */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Opening Hours</h3>
            <div className="text-sm space-y-1">
              <p>Mon - Fri: 08:00 – 22:00</p>
              <p>Saturday: 09:00 – 23:00</p>
              <p>Sunday: 10:00 – 21:00</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-stone-700 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs">
            &copy; {new Date().getFullYear()} Next Cafe. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <Link
                key={social.href}
                href={social.href}
                target="_blank"
                className="hover:text-white transition-colors"
              >
                <social.icon className="size-5" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
