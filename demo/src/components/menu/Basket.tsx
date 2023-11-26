import { Badge, Button, useDisclosure } from "@nextui-org/react";
import ShoppingCart from '@/components/icons/ShoppingCart';
import BasketModal from "@/components/menu/BasketModal";

function Basket() {
  let itemsInBasket = [
    {
      variantId: '1234',
      price: 2353
    },
    {
      variantId: '5678',
      price: 2353
    }
  ];

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className='sticky bottom-0 flex h-20 items-center justify-center bg-white'>
      <Button
        radius={'full'}
        className='text-md bg-black px-8 py-7 font-bold text-white'
        onClick={onOpen}
      >
        <Badge
          content='5'
          showOutline={false}
          isInvisible={itemsInBasket.length === 0}
          placement={'top-left'}
          className='bg-[#f9fafb]'
        >
          <ShoppingCart />
        </Badge>
        Warenkorb (25,99€)
      </Button>
      <BasketModal isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange} />
    </div>
  );
}

export default Basket;
