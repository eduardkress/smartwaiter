import { CategoryItem } from '@/types/categoryItem';
import React, { Fragment, useState } from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ScrollShadow,
  Textarea
} from '@nextui-org/react';
import Hero from '@/components/menu/Hero';
import Minus from '@/components/icons/Minus';
import Plus from '@/components/icons/Plus';
import { toast, Toaster } from 'sonner';
import { BasketItem } from '@/types/basketItem';
import { twMerge } from 'tailwind-merge';
import { calculateTotalPrice } from '@/services/ProductDataService';
import { EURO } from '@/utils/currencies';
import { useSearchParams } from 'next/navigation';

type Props = {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
  basketItems: Array<BasketItem>;
};

async function sendOrder(orderCode: string, orderItems: Array<BasketItem>) {
  //orderCode = 'b90d9b04-9010-483d-bdf1-41464c7ae03c';
  const data = {
    orderCode: orderCode,
    orderItems: orderItems
  };
  const res = await fetch('/api/order', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json'
    }
  });
}

function SingleItemMockup({ item }: { item: BasketItem }) {
  const [showTextArea, setShowTextArea] = useState<boolean>(false);
  const [extraText, setExtraText] = useState<string>('');

  return (
    <div className='container flex flex-col space-y-2 bg-white px-0'>
      <div className='flex flex-row'>
        <strong className='grow'>{item.variantId}</strong>
        <span className='pl-5'>{EURO.format(calculateTotalPrice(item))}</span>
      </div>
      {item.optionIds.length > 0 && (
        <div>
          <span>mit {item.optionIds.join(', ')}</span>
        </div>
      )}
      <div className='flex w-full items-center gap-x-2'>
        <div
          className='flex flex-grow underline hover:cursor-pointer'
          onClick={() => {
            setShowTextArea(!showTextArea);
            setExtraText('');
          }}
        >
          {showTextArea ? 'Anmerkung löschen' : 'Anmerkung hinzufügen'}
        </div>
        <Button
          isIconOnly
          className='text-md cursor-default snap-center rounded-full bg-gray-200 p-3 font-bold  shadow-sm hover:bg-gray-300 sm:cursor-pointer'
        >
          <Minus />
        </Button>
        <div>{item.amount}</div>
        <Button
          isIconOnly
          className='text-md cursor-default snap-center rounded-full bg-gray-200 p-3 font-bold text-black shadow-sm hover:bg-gray-300 sm:cursor-pointer'
        >
          <Plus />
        </Button>
      </div>
      <div className='flex flex-col'>
        <Textarea
          variant='bordered'
          value={extraText}
          onValueChange={(value) => {
            setExtraText(value);
          }}
          disableAutosize
          classNames={{
            input: 'resize-y min-h-[40px]'
          }}
          className={twMerge('hidden', showTextArea ? 'block' : 'hidden')}
        />
        <div
          className={twMerge(
            ' mr-2 mt-1 hidden justify-end gap-x-2',
            showTextArea ? 'flex' : 'hidden'
          )}
        >
          <div
            className='text-sm underline hover:cursor-pointer'
            onClick={() => {
              setExtraText('');
              setShowTextArea(false);
            }}
          >
            Löschen
          </div>
        </div>
      </div>
    </div>
  );
}

const BasketModal = ({ isOpen, onOpen, onOpenChange, basketItems }: Props) => {
  const searchParams = useSearchParams();
  const orderCode = searchParams.get('t');

  return (
    <Fragment>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size={'xl'}
        classNames={{
          body: 'px-0 py-0',
          footer: 'bg-[#f5f3f1]',
          closeButton: 'bg-white'
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Warenkorb</ModalHeader>
              <ModalBody>
                <ScrollShadow className='flex max-h-[60vh] min-h-[40vh] flex-col space-y-10 overflow-y-auto px-6 py-2'>
                  {basketItems.map((item, index) => {
                    return <SingleItemMockup key={index} item={item} />;
                  })}
                </ScrollShadow>
              </ModalBody>
              <ModalFooter>
                <Button
                  radius={'full'}
                  className='text-md w-full bg-black px-8 py-7 font-bold text-white'
                  onClick={() => {
                    onClose();
                    toast.promise(sendOrder(orderCode ?? '', basketItems), {
                      loading: 'Deine Bestellung wird abgeschickt...',
                      success: (data) => {
                        return `Deine Bestellung ist eingegangen. Wir kümmern uns drum!`;
                      },
                      error: 'Error'
                    });
                  }}
                >
                  Jetzt Bestellen (
                  {EURO.format(calculateTotalPrice(basketItems))})
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Toaster richColors position='bottom-center' />
    </Fragment>
  );
};

export default BasketModal;
