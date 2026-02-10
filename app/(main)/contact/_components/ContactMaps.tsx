import React from "react";

export default function ContactMaps() {
  return (
    <div className="bg-stone-800">
      <div className="w-full max-w-7xl mx-auto px-4 py-12">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387196.0765558679!2d-74.30914354574547!3d40.696672713256774!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20Amerika%20Birle%C5%9Fik%20Devletleri!5e0!3m2!1str!2str!4v1770714722387!5m2!1str!2str"
          className="w-full h-80 md:h-112.5 rounded-xl"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}
