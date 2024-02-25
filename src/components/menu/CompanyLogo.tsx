import Image from "next/image";
import { useState } from "react";
import { Skeleton } from "@nextui-org/react";

interface Props {
  imgSrc: string;
  heroAlt: string;
}

function CompanyLogo({ imgSrc, heroAlt }: Props) {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <div className="container mx-auto flex h-20 max-w-2xl justify-center bg-green-200 bg-transparent">
      <div className="relative size-40 -translate-y-20 rounded-lg border bg-white shadow">
        <div className="absolute inset-0">
          <Skeleton className="h-full w-full rounded-lg" isLoaded={isLoaded} />
          <Image
            className="rounded-lg"
            src={imgSrc}
            alt={heroAlt}
            fill
            sizes={"160px"}
            style={{ objectFit: "contain" }}
            onLoad={() => setIsLoaded(true)}
            priority={true}
          />
        </div>
      </div>
    </div>
  );
}

export default CompanyLogo;
