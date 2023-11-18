'use client';

import _menuItem from '@/mockup/menu2.json';
import _restaurantData from '@/mockup/restaurant.json';
import { MenuCategory } from '@/types/menuCategory';
import { Restaurant } from '@/types/restaurant';
import Menu from '@/components/menu/Menu';
import Hero from '@/components/menu/Hero';
import CompanyLogo from '@/components/menu/CompanyLogo';
import CompanyDetails from '@/components/menu/CompanyDetails';
import Footer from '@/components/menu/Footer';
import NavBar from '@/components/menu/NavBar';
import { NextUIProvider } from '@nextui-org/react';

//const menu = _menuItem as MenuCategory[];
const restaurantData = _restaurantData as Restaurant;
const menu = restaurantData.menu;

const getOrderData = (orderId: string) => {
  if (orderId === '1234') {
    return {
      orderId: orderId,
      isActive: true
    };
  } else if (orderId === '5678') {
    return {
      orderId: orderId,
      isActive: false
    };
  }
  return null;
};

export default function Page({
  params,
  searchParams
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const paramOrderId = searchParams?.t;
  if (!paramOrderId || Array.isArray(paramOrderId)) {
    return (
      <div>We are unable to find your order id. Please check your link</div>
    );
  }

  const orderData = getOrderData(paramOrderId);

  if (!orderData)
    return (
      <div>We are unable to find your order. Please check if it is valid</div>
    );

  if (orderData.isActive) {
    return (
      <NextUIProvider id='mainArea'>
        <Hero imgSrc={'/images/hero-restaurants.jpeg'} heroAlt={'Unser Menü'} />
        <CompanyLogo imgSrc={'/images/losteria.svg'} heroAlt={'Unser Menü'} />
        <CompanyDetails
          companyName={'Losteria'}
          companySlogan={'Slogan: Food that makes you say wow.'}
        />
        <NavBar menu={menu} />
        <Menu menu={menu} />
        <Footer />
      </NextUIProvider>
    );
  } else {
    return <div>Download your invoice here:</div>;
  }
}
