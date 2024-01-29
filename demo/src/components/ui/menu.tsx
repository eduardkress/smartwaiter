import React from 'react';
import Image from 'next/image';
import { MenuItem } from '@/types/menuItem';

const Menu = ({ items }: { items: MenuItem[] }) => {
  return (
    <div className='mx-auto my-0 grid w-[90vw] max-w-[1170px] justify-items-center gap-[3rem_2rem] lg:w-[95vw] lg:grid-cols-[1fr_1fr]'>
      {items.map((menuItem) => {
        const { id, title, img, price, desc, allergens } = menuItem;

        return (
          <article
            key={id}
            className='grid max-w-[25rem] gap-[1rem_2rem] md:max-w-screen-sm md:grid-cols-[225px_1fr] md:gap-[0_1.25rem]'
          >
            <Image
              src={img}
              alt={title}
              width={200}
              height={80}
              className='block h-[200px] w-full rounded-[var(--radius)] border-4 border-solid border-[#c59d5f] object-cover'
            />
            <div>
              <header className='flex justify-between border-b-[0.5px] border-dotted border-b-[hsl(210,22%,49%)]'>
                <h4 className='mb-2 text-sm font-bold capitalize leading-tight tracking-[0.1rem]'>
                  {title}{' '}
                  {allergens ? (
                    <sup className='font-light'>{allergens}</sup>
                  ) : (
                    ''
                  )}
                </h4>
                <h4 className='mb-2 text-sm font-bold capitalize leading-tight tracking-[0.1rem] text-[#c59d5f]'>
                  ${price}
                </h4>
              </header>
              <p className='mb-5 pt-4 text-[hsl(210,22%,49%)]'>{desc}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export { Menu };
