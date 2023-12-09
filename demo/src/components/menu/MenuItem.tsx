import * as React from 'react';
import { Fragment } from 'react';
import Image from 'next/image';
import MenuModal from '@/components/menu/MenuModal';
import { useDisclosure } from '@nextui-org/react';
import MenuItemTitle from '@/components/menu/MenuItemTitle';
import { Menu, Product } from '@/types/restaurant';
import { EURO } from '@/utils/currencies';

type Props = {
  menu: Menu;
  product: Product;
};

export function MenuItem({ menu, product }: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div>
      <div className='container mx-auto'>
        <div
          className='container flex max-w-5xl cursor-pointer flex-row justify-between gap-x-6 rounded-lg border border-gray-300 bg-white p-4 shadow hover:bg-[#f5f5f5]'
          onClick={onOpen}
        >
          <div className='flex flex-col gap-y-2'>
            <h3 className='text-base font-bold sm:text-2xl'>
              <MenuItemTitle
                product={product}
                allergens={product.allergenIds.map((id) => {
                  return menu.allergens[id];
                })}
              />
            </h3>
            <div className='text-sm font-normal md:text-base'>
              {product.description}
            </div>
            {product.variants.length > 1 ? (
              <div className='font-sans text-sm sm:font-normal'>
                Wahl aus:{' '}
                {product.variants.reduce(
                  (previousValue, currentValue, currentIndex) =>
                    previousValue +
                    (currentIndex === 0
                      ? currentValue.name
                      : ', ' + currentValue.name),
                  ''
                )}
              </div>
            ) : (
              <Fragment />
            )}
            <div className='flex grow flex-col-reverse pt-3 text-base font-bold sm:text-xl'>
              <div className=''>
                {product.variants.length > 1
                  ? 'ab ' +
                    EURO.format(
                      product.variants[0].prices.pickup /
                        menu.currency.denominator
                    )
                  : EURO.format(
                      product.variants[0].prices.pickup /
                        menu.currency.denominator
                    )}
              </div>
            </div>
          </div>
          {/*TODO: Bild beim Mobile vllt einfach weg? Man sieht iwie eh nicht viel dann lieber in dem Modal*/}
          {product.imageUrl && (
            <div className='relative hidden h-20 w-20 shrink-0 rounded-lg border shadow sm:block sm:h-40 sm:w-40'>
              <div className='absolute inset-0'>
                <Image
                  className='rounded-lg'
                  src={product.imageUrl}
                  alt='Item1'
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <MenuModal
        menu={menu}
        product={product}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
    </div>
  );
}

export default MenuItem;
