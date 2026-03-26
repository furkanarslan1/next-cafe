import { getHeroSettings } from "@/app/(actions)/menuHero/getHeroSettings";
import SocialMediaForm from "./_components/SocialMediaForm";

export default async function AdminSocialMediaPage() {
  const hero = await getHeroSettings("global");

  return (
    <div className="max-w-4xl mx-auto my-16">
      <h1 className="text-2xl font-bold px-4">Social Media</h1>
      <SocialMediaForm defaultInstagramUrl={hero.instagram_url ?? ""} />
    </div>
  );
}
