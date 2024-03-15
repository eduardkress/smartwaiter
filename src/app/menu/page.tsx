import _restaurantData from "@/data/restaurant.json";
import { Restaurant } from "@/types/restaurant";
import Menu from "@/components/menu/Menu";
import Hero from "@/components/menu/Hero";
import CompanyLogo from "@/components/menu/CompanyLogo";
import CompanyDetails from "@/components/menu/CompanyDetails";
import Footer from "@/components/menu/Footer";
import NavBar from "@/components/menu/NavBar";
import { Basket } from "@/components/menu/Basket";
import { Providers } from '@/app/providers';

const restaurantData = _restaurantData as Restaurant;

export default function Page() {
  return (
    <Providers>
      <Hero
        imgSrc={restaurantData.hero.headerImageUrl}
        heroAlt={"Unser Menü"}
        imageSizes={"100vw"}
        priority={true}
      />
      <CompanyLogo imgSrc={restaurantData.hero.logoUrl} heroAlt={"Logo"} />
      <CompanyDetails
        companyHero={restaurantData.hero}
        companyInformation={restaurantData.information}
      />
      <NavBar menu={restaurantData.menu} />
      <div>
        <Menu menu={restaurantData.menu} />
        <Footer companyInformation={restaurantData.information} />
        <Basket />
      </div>
    </Providers>
  );
}
