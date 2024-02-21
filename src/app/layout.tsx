import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NextAuthProvider } from "@/providers/NextAuthProvider";
import _restaurantData from "@/data/ariana.json";
import { Restaurant } from "@/types/restaurant";

const inter = Inter({ subsets: ["latin"] });

const restaurantData = _restaurantData as Restaurant;

export const metadata: Metadata = {
  title: `${restaurantData.hero.name} | Smartwaiter`,
  description: `${restaurantData.hero.name}`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
