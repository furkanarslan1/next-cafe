import CostumerFavorites from "./_components/CostumerFavorites";
import HomeHero from "./_components/HomeHero";

export default function Home() {
  return (
    <div className="space-y-4">
      <HomeHero />
      <CostumerFavorites />
    </div>
  );
}
