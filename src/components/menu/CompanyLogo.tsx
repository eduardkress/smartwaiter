import Image from 'next/image';

interface Props {
  imgSrc: string;
  heroAlt: string;
}

function CompanyLogo({ imgSrc, heroAlt }: Props) {
  return (
    <div className='container mx-auto flex h-20 max-w-2xl justify-center bg-green-200 bg-transparent'>
      <div className='relative h-40 w-40 -translate-y-20 rounded-lg border bg-white shadow'>
        <div className='absolute inset-0'>
          <Image className='p-2' src={imgSrc} alt={heroAlt} fill style={{ objectFit: 'contain' }} />
        </div>
      </div>
    </div>
  );
}

export default CompanyLogo;
