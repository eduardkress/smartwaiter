'use client';
import { Amplify } from 'aws-amplify';
import _restaurantData from '@/mockup/restaurant.json';
import { Restaurant } from '@/types/restaurant';
import Menu from '@/components/menu/Menu';
import Hero from '@/components/menu/Hero';
import CompanyLogo from '@/components/menu/CompanyLogo';
import CompanyDetails from '@/components/menu/CompanyDetails';
import Footer from '@/components/menu/Footer';
import NavBar from '@/components/menu/NavBar';
import { NextUIProvider } from '@nextui-org/react';
import { Basket } from '@/components/menu/Basket';
import { generateClient } from 'aws-amplify/api';
import { getOrderCodeById } from '@/graphql/queries';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

//const menu = _menuItem as MenuCategory[];
const restaurantData = _restaurantData as Restaurant;

Amplify.configure({
  // @ts-ignore
  aws_appsync_graphqlEndpoint:
    'https://hrdurbet4zhuhhsv6l6h3waa6y.appsync-api.eu-central-1.amazonaws.com/graphql',
  aws_appsync_region: 'eu-central-1',
  aws_appsync_authenticationType: 'API_KEY',
  aws_appsync_apiKey: 'da2-kbr4bvydx5gitc24biosqxunbq'
});

const client = generateClient();

export default function Page() {
  const searchParams = useSearchParams();

  const [isValidOrderCode, setIsValidOrderCode] = useState<boolean>(true);

  useEffect(() => {
    const orderCodeId = searchParams.get('t');

    if (!orderCodeId || Array.isArray(orderCodeId)) {
      setIsValidOrderCode(false);
    } else {
      client
        .graphql({
          query: getOrderCodeById,
          variables: {
            orderCodeId: orderCodeId
          }
        })
        .then((result) => {
          const orderCode = result.data.getOrderCodeById;
          if (!orderCode || !orderCode.isActive) {
            setIsValidOrderCode(false);
          }
        });
    }
  }, []);

  return (
    <NextUIProvider id='mainArea'>
      <div
        className={twMerge(
          'justify-center bg-red-500 text-xl',
          isValidOrderCode ? 'hidden' : 'flex'
        )}
      >
        Dein Bestellcode ist ungültig!
      </div>

      <Hero imgSrc={'/images/hero-restaurants.jpeg'} heroAlt={'Unser Menü'} />
      <CompanyLogo imgSrc={'/images/losteria.svg'} heroAlt={'Unser Menü'} />
      <CompanyDetails
        companyName={'Losteria'}
        companySlogan={'Slogan: Food that makes you say wow.'}
      />
      <NavBar menu={restaurantData.menu} />
      <div>
        <Menu menu={restaurantData.menu} />
        <Footer />
        <Basket />
      </div>
    </NextUIProvider>
  );
}
