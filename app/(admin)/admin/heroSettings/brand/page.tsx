import { getHeroSettings } from "@/app/(actions)/menuHero/getHeroSettings";
import BrandForm from "./_components/BrandForm";

export default async function BrandPage() {
  const hero = await getHeroSettings("global");

  return (
    <div className="max-w-4xl mx-auto my-16">
      <h1 className="text-2xl font-bold px-4">Change Brand Name</h1>
      <BrandForm defaultBrandName={hero.brand_name ?? ""} />
    </div>
  );
}
