"use client";
import { Button, NextUIProvider } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default async function Home() {
  const router = useRouter();
  return (
    <NextUIProvider id="mainArea">
      <div className="h-full w-full flex items-center justify-center">
        <Button
          onClick={() => {
            router.push("/menu");
          }}
        >
          Zur Speisekarte
        </Button>
      </div>
    </NextUIProvider>
  );
}
