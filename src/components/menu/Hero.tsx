"use client";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { useState } from "react";
import { Skeleton } from "@nextui-org/react";
import * as React from "react";

interface Props {
  imgSrc: string;
  heroAlt: string;
  tailwindClasses?: string;
  imageSizes: string;
  priority?: boolean;
}

function Hero({ imgSrc, heroAlt, tailwindClasses, imageSizes, priority = false }: Props) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={twMerge("relative h-80 w-full", tailwindClasses)}>
      <div className="absolute inset-0">
        <Skeleton className="h-full w-full" isLoaded={isLoaded} />
        <Image
          src={imgSrc}
          alt={heroAlt}
          fill
          sizes={imageSizes}
          style={{ objectFit: "cover" }}
          onLoad={() => setIsLoaded(true)}
          priority={priority}
        />
      </div>
    </div>
  );
}

export default Hero;
