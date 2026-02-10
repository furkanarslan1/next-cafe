import { Mail, MapPin, Phone } from "lucide-react";
import React from "react";

export default function HomeContact() {
  return (
    <div className="bg-stone-300 min-h-50 flex flex-col md:flex-row items-center justify-center gap-8 p-4">
      <a
        href="https://www.google.com/maps/search/123+Brew+Street,+New+York,+NY+10001"
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center hover:text-amber-700 transition-colors"
      >
        <div className="flex flex-col items-center font-bold gap-2">
          <MapPin />
          <p className="text-sm">Our Location</p>
        </div>
        <p className="text-xs">123 Brew Street, New York, NY 10001</p>
      </a>
      <a
        href="tel:+15551234567"
        className="flex flex-col items-center hover:text-amber-700 transition-colors"
      >
        <div className="flex flex-col items-center font-bold gap-2">
          <Phone />
          <p className="text-sm">Call Us</p>
        </div>
        <p className="text-xs">+1 (555) 123-4567</p>
      </a>
      <a
        href="mailto:hello@nextcafe.com"
        className="flex flex-col items-center hover:text-amber-700 transition-colors"
      >
        <div className="flex flex-col items-center font-bold gap-2">
          <Mail />
          <p className="text-sm">Email Us</p>
        </div>
        <p className="text-xs">hello@nextcafe.com</p>
      </a>
    </div>
  );
}
