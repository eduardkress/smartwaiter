import * as React from 'react';
import { Fragment } from 'react';
import Image from 'next/image';
import { CategoryItem } from '@/types/categoryItem';
import MenuModal from '@/components/menu/MenuModal';
import { useDisclosure } from '@nextui-org/react';
import MenuItemTitle from '@/components/menu/MenuItemTitle';

type Props = {
  item: CategoryItem;
};

export function MenuItem({ item }: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div key={item.id}>
      <div className='container mx-auto'>
        <div
          className='container flex max-w-5xl cursor-pointer flex-row justify-between gap-x-6 rounded-lg border border-gray-300 bg-white p-4 shadow hover:bg-[#f5f5f5]'
          onClick={onOpen}
        >
          <div className='flex flex-col gap-y-2'>
            <h3 className='text-base font-bold sm:text-2xl'>
              <MenuItemTitle item={item} />
            </h3>
            <div className='text-sm font-normal md:text-base'>{item.desc}</div>
            {item.prices.length > 1 ? (
              <div className='font-sans text-sm sm:font-normal'>
                Wahl aus:{' '}
                {item.prices.reduce(
                  (previousValue, currentValue, currentIndex) =>
                    previousValue +
                    (currentIndex === 0
                      ? currentValue.variation
                      : ', ' + currentValue.variation),
                  ''
                )}
              </div>
            ) : (
              <Fragment />
            )}
            <div className='flex grow flex-col-reverse pt-3 text-base font-bold sm:text-xl'>
              <div className=''>
                {item.prices.length > 1
                  ? 'ab ' + item.prices[0].price + ' €'
                  : item.prices[0].price + ' €'}
              </div>
            </div>
          </div>
          {/*TODO: Bild beim Mobile vllt einfach weg? Man sieht iwie eh nicht viel dann lieber in dem Modal*/}
          <div className='relative h-20 w-20 shrink-0 rounded-lg border shadow sm:h-40 sm:w-40 sm:block hidden'>
            <div className='absolute inset-0'>
              <Image
                className='rounded-lg'
                src={item.img}
                alt='Item1'
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </div>
      <MenuModal item={item} isOpen={isOpen} onOpenChange={onOpenChange} />
    </div>
  );
}

export default MenuItem;
