import { Badge, Button } from "@nextui-org/react";
import ShoppingCart from '@/components/icons/ShoppingCart';

function Basket() {
  return (
    <div className='sticky bottom-0 flex h-20 items-center justify-center bg-white'>
      <Button radius={'full'} className="py-7 px-8 text-md font-bold bg-black text-white">
        <Badge content="5" showOutline={false} isInvisible={5 === 0} placement={"top-left"} className="bg-[#f9fafb]" >
          <ShoppingCart />
        </Badge>
        Warenkorb (25,99€)
      </Button>
    </div>
  );
}

export default Basket;
