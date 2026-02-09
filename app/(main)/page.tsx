import CafeGallery from "./_components/CafeGallery";
import CustomerFavorites from "./_components/CustomerFavorites";
import HomeAbout from "./_components/HomeAbout";
import HomeContact from "./_components/HomeContact";
import HomeHero from "./_components/HomeHero";
import HomeVideo from "./_components/HomeVideo";
import ReservaitonBanner from "./_components/ReservaitonBanner";

export default function Home() {
  return (
    <div className="space-y-4">
      <HomeHero />
      <div className="space-y-4 max-w-7xl mx-auto">
        <CustomerFavorites />
      </div>
      <ReservaitonBanner />
      <HomeVideo />
      <HomeAbout />
      <CafeGallery />
      <HomeContact />
    </div>
  );
}
