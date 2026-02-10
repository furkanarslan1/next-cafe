import React from "react";
import ContactHero from "./_components/ContactHero";
import HomeContact from "../_components/HomeContact";
import ContactMaps from "./_components/ContactMaps";
import ContactSocial from "./_components/ContactSocial";

export default function ContactPage() {
  return (
    <div>
      <ContactHero />
      <HomeContact />
      <ContactSocial />
      <ContactMaps />
    </div>
  );
}
