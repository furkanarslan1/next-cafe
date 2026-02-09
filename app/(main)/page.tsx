import CustomerFavorites from "./_components/CustomerFavorites";
import HomeContact from "./_components/HomeContact";
import HomeHero from "./_components/HomeHero";
import ReservaitonBanner from "./_components/ReservaitonBanner";

export default function Home() {
  return (
    <div className="">
      <HomeHero />
      <div className="space-y-4 max-w-7xl mx-auto">
        <CustomerFavorites />
      </div>
      <ReservaitonBanner />
      <HomeContact />
    </div>
  );
}
