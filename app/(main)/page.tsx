import CustomerFavorites from "./_components/CustomerFavorites";
import HomeHero from "./_components/HomeHero";

export default function Home() {
  return (
    <div className="space-y-4">
      <HomeHero />
      <div className="space-y-4 max-w-7xl mx-auto">
        <CustomerFavorites />
      </div>
    </div>
  );
}
