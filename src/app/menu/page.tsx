"use client";
import _restaurantData from "@/data/restaurant.json";
import { Restaurant } from "@/types/restaurant";
import Menu from "@/components/menu/Menu";
import Hero from "@/components/menu/Hero";
import CompanyLogo from "@/components/menu/CompanyLogo";
import CompanyDetails from "@/components/menu/CompanyDetails";
import Footer from "@/components/menu/Footer";
import NavBar from "@/components/menu/NavBar";
import { NextUIProvider } from "@nextui-org/react";
import { Basket } from "@/components/menu/Basket";
import { Suspense } from "react";

const restaurantData = _restaurantData as Restaurant;

export default function Page() {
  return (
    <Suspense>
      <NextUIProvider id="mainArea">
        <Hero
          imgSrc={restaurantData.hero.headerImageUrl}
          heroAlt={"Unser Menü"}
          imageSizes={"100vw"}
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
      </NextUIProvider>
    </Suspense>
  );
}
