import { CategoryItem } from '@/types/categoryItem';
import React, { Fragment } from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ScrollShadow
} from '@nextui-org/react';
import Hero from '@/components/menu/Hero';
import MenuItemTitle from '@/components/menu/MenuItemTitle';
import Minus from '@/components/icons/Minus';
import Plus from '@/components/icons/Plus';
import { toast, Toaster } from 'sonner';
type Props = {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
};

function SingleItemMockup() {
  return (
    <div className='container flex flex-col space-y-2 bg-white px-0'>
      <div className='flex flex-row'>
        <strong className='grow'>
          Pizza 1 super lange beschreibung mit super viel Text drin
        </strong>
        <span className='pl-5'>15,99€</span>
      </div>
      <div>mit Variation Text</div>
      <div className='flex w-full items-center gap-x-2'>
        <div className='grow underline'>Anmerkung hinzufügen</div>
        <Button
          isIconOnly
          className='text-md cursor-default snap-center rounded-full bg-gray-200 p-3 font-bold  shadow-sm hover:bg-gray-300 sm:cursor-pointer'
        >
          <Minus />
        </Button>
        <div>1</div>
        <Button
          isIconOnly
          className='text-md cursor-default snap-center rounded-full bg-gray-200 p-3 font-bold text-black shadow-sm hover:bg-gray-300 sm:cursor-pointer'
        >
          <Plus />
        </Button>
      </div>
    </div>
  );
}

const BasketModal = ({ isOpen, onOpen, onOpenChange }: Props) => {
  const promise = () => new Promise((resolve) => setTimeout(resolve, 3000));

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
                  <SingleItemMockup />
                  <SingleItemMockup />
                  <SingleItemMockup />
                  <SingleItemMockup />
                  <SingleItemMockup />
                  <SingleItemMockup />
                  <SingleItemMockup />
                  <SingleItemMockup />
                  <SingleItemMockup />
                  <SingleItemMockup />
                  <SingleItemMockup />
                </ScrollShadow>
              </ModalBody>
              <ModalFooter>
                <Button
                  radius={'full'}
                  className='text-md w-full bg-black px-8 py-7 font-bold text-white'
                  onClick={() => {
                    onClose();
                    toast.promise(promise, {
                      loading: 'Deine Bestellung wird abgeschickt...',
                      success: (data) => {
                        return `Deine Bestellung ist eingegangen. Wir kümmern uns drum!`;
                      },
                      error: 'Error'
                    });
                  }}
                >
                  Verbindlich bestellen (€€€)
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
