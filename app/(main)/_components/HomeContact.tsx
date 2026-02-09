import { Mail, MapIcon, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function HomeContact() {
  return (
    <div className="bg-stone-300 flex flex-col md:flex-row items-center justify-center gap-8 p-4">
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center font-bold gap-2 ">
          <MapPin />
          <p className="text-sm">Our Location</p>
        </div>
        <p className="text-xs">123 Brew Street, New York, NY 10001</p>
      </div>
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center font-bold gap-2">
          <Phone />
          <p className="text-sm">Call Us</p>
        </div>
        <p className="text-xs">+1 (555) 123-4567</p>
      </div>
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center font-bold gap-2">
          <Mail />
          <p className="text-sm">Email Us</p>
        </div>
        <p className="text-xs">hello@nextcafe.com</p>
      </div>
    </div>
  );
}
