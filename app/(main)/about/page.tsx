export const revalidate = 518400; // 6 days — keeps Supabase active, revalidated on admin actions via revalidatePath

import React from "react";
import AboutHero from "./_components/AboutHero";

import AboutIcons from "./_components/AboutIcons";
import AboutStory from "./_components/AboutStory";
import AboutTeam from "./_components/AboutTeam";

export default function AboutPage() {
  return (
    <div>
      <AboutHero />
      <AboutTeam />
      <AboutIcons />
      <AboutStory />
    </div>
  );
}
