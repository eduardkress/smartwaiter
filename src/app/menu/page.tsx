"use client";
import { Amplify } from "aws-amplify";
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
import { generateClient } from "aws-amplify/api";
import { getOrderCodeById } from "@/graphql/queries";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { SiteType, SiteTypeQueryParamName } from "@/types/siteType";
import { SiteSlot } from "@/components/slotting/SiteSlot";

const restaurantData = _restaurantData as Restaurant;

Amplify.configure({
  // @ts-expect-error Parameter kann nicht zugewiesen werden
  aws_appsync_graphqlEndpoint:
    "https://hadwdiehg5gepkw7uzg7fd6dya.appsync-api.eu-central-1.amazonaws.com/graphql",
  aws_appsync_region: "eu-central-1",
  aws_appsync_authenticationType: "API_KEY",
  aws_appsync_apiKey: "da2-zwrw5p7o4bg6lmofaw6fwodfye",
});

const client = generateClient();

function validateOrderCodeId(
  orderCodeId: string | null,
  setIsValidOrderCode: Dispatch<SetStateAction<boolean>>
) {
  if (!orderCodeId || Array.isArray(orderCodeId)) {
    setIsValidOrderCode(false);
  } else {
    client
      .graphql({
        query: getOrderCodeById,
        variables: {
          orderCodeId: orderCodeId,
        },
      })
      .then((result) => {
        const orderCode = result.data.getOrderCodeById;
        if (!orderCode || !orderCode.isActive) {
          setIsValidOrderCode(false);
        }
      });
  }
}

function validateSiteTypeAccessRight(siteType: SiteType) {
  console.log(siteType);
  //TODO: request the backend, if the current customer is eligible for the siteType, if not redirect to 404
}

export default function Page() {
  const searchParams = useSearchParams();

  const [isValidOrderCode, setIsValidOrderCode] = useState<boolean>(true);

  useEffect(() => {
    const orderCodeId = searchParams.get("t");
    const siteType = searchParams.get(SiteTypeQueryParamName) as SiteType;

    validateOrderCodeId(orderCodeId, setIsValidOrderCode);
    validateSiteTypeAccessRight(siteType);
  }, [searchParams]);

  return (
    <NextUIProvider id="mainArea">
      <SiteSlot siteType={SiteType.Waiter}>
        <div
          className={twMerge(
            "justify-center bg-red-500 text-xl",
            isValidOrderCode ? "hidden" : "flex"
          )}
        >
          Dein Bestellcode ist ungültig!
        </div>
      </SiteSlot>

      <Hero
        imgSrc={restaurantData.hero.headerImageUrl}
        heroAlt={"Unser Menü"}
      />
      <CompanyLogo
        imgSrc={restaurantData.hero.logoUrl}
        heroAlt={"Unser Menü"}
      />
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
  );
}
