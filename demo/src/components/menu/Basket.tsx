import { Badge, Button, useDisclosure } from '@nextui-org/react';
import ShoppingCart from '@/components/icons/ShoppingCart';
import BasketModal from '@/components/menu/BasketModal';
import { effect, signal } from '@preact/signals';
import { BasketItem } from '@/types/basketItem';

export const basketSignal = signal<BasketItem[]>([
  { variationId: '', optionIds: [], amount: 0 }
]);

export const addToBasket = (
  variationId: string,
  optionIds: string[],
  amount: number
) => {
  basketSignal.value = [
    ...basketSignal.value,
    { variationId: variationId, optionIds: optionIds, amount: amount }
  ];
};

effect(() => console.log('Basket changed', basketSignal.value));

function Basket() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className='sticky bottom-0 flex h-20 items-center justify-center bg-[#f5f3f1] shadow-inner'>
      <Button
        radius={'full'}
        className='text-md bg-black px-8 py-7 font-bold text-white'
        onClick={onOpen}
      >
        <Badge
          content='5'
          showOutline={false}
          isInvisible={basketSignal.value.length === 0}
          placement={'top-left'}
          className='bg-[#f9fafb]'
        >
          <ShoppingCart />
        </Badge>
        Warenkorb (25,99€)
      </Button>
      <BasketModal
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
      />
    </div>
  );
}

export default Basket;
