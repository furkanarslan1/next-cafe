import CustomerFavorites from "./_components/CustomerFavorites";
import HomeHero from "./_components/HomeHero";
import ReservaitonBanner from "./_components/ReservaitonBanner";

export default function Home() {
  return (
    <div className="space-y-4">
      <HomeHero />
      <div className="space-y-4 max-w-7xl mx-auto">
        <CustomerFavorites />
      </div>
      <ReservaitonBanner />
    </div>
  );
}
