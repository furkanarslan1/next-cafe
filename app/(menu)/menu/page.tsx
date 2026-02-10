import MenuMainCategory from "./_components/MenuMainCategory";
import MenuHero from "./_components/MenuHero";

export default function MenuPage() {
  return (
    <div className="min-h-screen bg-stone-700 space-y-6">
      <MenuHero />
      <MenuMainCategory />
    </div>
  );
}
