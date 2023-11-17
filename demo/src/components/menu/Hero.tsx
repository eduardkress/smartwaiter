import Image from 'next/image';
import {twMerge} from "tailwind-merge";

interface Props {
  imgSrc: string;
  heroAlt: string;
  tailwindClasses?: string;
}

function Hero({ imgSrc, heroAlt, tailwindClasses }: Props) {
  return (
    <div className={twMerge('relative h-80 w-full', tailwindClasses)}>
      <div className='absolute inset-0'>
        <Image src={imgSrc} alt={heroAlt} fill style={{ objectFit: 'cover' }} />
      </div>
    </div>
  );
}

export default Hero;
