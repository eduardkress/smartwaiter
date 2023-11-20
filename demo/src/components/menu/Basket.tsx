import { Badge, Button } from '@nextui-org/react';
import ShoppingCart from '@/components/icons/ShoppingCart';

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

  return (
    <div className='sticky bottom-0 flex h-20 items-center justify-center bg-white'>
      <Button
        radius={'full'}
        className='text-md bg-black px-8 py-7 font-bold text-white'
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
    </div>
  );
}

export default Basket;
