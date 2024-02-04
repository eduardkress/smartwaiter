import { Badge, Button, useDisclosure } from '@nextui-org/react';
import ShoppingCart from '@/components/icons/ShoppingCart';
import BasketModal from '@/components/menu/BasketModal';
import { signal } from '@preact/signals';
import { BasketItem } from '@/types/basketItem';
import {
  calculateTotalItems,
  calculateTotalPrice,
} from '@/services/ProductDataService';
import { Fragment, useEffect, useState } from 'react';
import { EURO } from '@/utils/currencies';
import { twMerge } from 'tailwind-merge';
import { Toaster } from 'sonner';

export const basketSignal = signal<BasketItem[]>([]);

export const addToBasket = (
  productId: string,
  variantId: string,
  optionIds: string[],
  amount: number,
  extraText: string
) => {
  basketSignal.value = [
    ...basketSignal.value,
    {
      productId: productId,
      variantId: variantId,
      optionIds: optionIds,
      amount: amount,
      extraText: extraText,
    },
  ];
};

export const clearBasket = () => {
  basketSignal.value = new Array<BasketItem>();
};

export function Basket() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [basketPrice, setBasketPrice] = useState<number>(0);
  const [itemsInBasket, setItemsInBasekt] = useState<number>(0);

  useEffect(() => {
    const unsubscribe = basketSignal.subscribe((value) => {
      const totalPrice = calculateTotalPrice(value);
      setBasketPrice(totalPrice);
      const totalItemsInBasket = calculateTotalItems(value);
      setItemsInBasekt(totalItemsInBasket);
    });

    return () => {
      unsubscribe();
    };
  });

  return (
    <Fragment>
      <Toaster richColors position='bottom-center' />
      <div
        className={twMerge(
          'sticky bottom-0 h-20 items-center justify-center bg-[#f5f3f1] shadow-inner',
          basketSignal.value.length > 0 ? 'flex' : 'hidden'
        )}
      >
        <Button
          radius={'full'}
          className='text-md bg-black px-8 py-7 font-bold text-white'
          onClick={onOpen}
        >
          <Badge
            content={itemsInBasket}
            showOutline={false}
            isInvisible={basketSignal.value.length === 0}
            placement={'top-left'}
            className='bg-[#f9fafb]'
          >
            <ShoppingCart />
          </Badge>
          Warenkorb {EURO.formatCents(basketPrice)}
        </Button>
        <BasketModal
          isOpen={isOpen}
          onOpen={onOpen}
          onOpenChange={onOpenChange}
          basketItems={basketSignal.value}
        />
      </div>
    </Fragment>
  );
}
