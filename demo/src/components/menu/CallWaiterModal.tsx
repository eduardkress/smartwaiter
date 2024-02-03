import React, { Fragment } from 'react';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';

type Props = {
  isOpen: boolean;
  onOpenChange: () => void;
};

const CallWaiterModal = ({ isOpen, onOpenChange }: Props) => {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size={'lg'}
      classNames={{
        body: 'px-0 py-0',
        footer: 'bg-[#f5f3f1]',
        closeButton: 'bg-white',
      }}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader>Kellner rufen</ModalHeader>
            <ModalBody>
              <div className='container bg-white pb-4'>
                Du hast ein Anliegen und willst den Kellner sprechen? Kein Problem!
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                radius={'full'}
                className='text-md w-full bg-black px-8 py-7 font-bold text-white'
                // onClick={() => {
                //   toast.promise(sendOrder(orderCode ?? '', basketItems), {
                //     loading: 'Deine Bestellung wird abgeschickt...',
                //     success: () => {
                //       onClose();
                //       clearBasket();
                //       return 'Deine Bestellung ist eingegangen. Wir kümmern uns drum!';
                //     },
                //     error: () => {
                //       return 'Deine Bestellung konnte nicht verarbeitet werden. Bitte versuche es später erneut!';
                //     },
                //   });
                // }}
              >
                Kellner jetzt rufen
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default CallWaiterModal;
