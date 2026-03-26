import { getHeroSettings } from "@/app/(actions)/menuHero/getHeroSettings";
import HeroForm from "../_components/HeroForm";

export default async function DrinksHeroPage() {
  const hero = await getHeroSettings("drinks");

  return (
    <div className="max-w-4xl mx-auto my-16">
      <h1 className="text-2xl font-bold px-4">Drinks Hero</h1>
      <HeroForm
        page="drinks"
        defaultValues={{
          title: hero.title ?? "",
          description: hero.description ?? "",
          existingImageUrl: hero.image_url ?? undefined,
          existingImagePublicId: hero.image_public_id ?? undefined,
        }}
      />
    </div>
  );
}
