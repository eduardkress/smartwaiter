import React, { useRef } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@nextui-org/react';
import { useReactToPrint } from 'react-to-print';
import { ComponentToPrint } from './ComponentToPrint';
import { OrderCode } from '@/API';

type Props = {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
  orderCode: OrderCode;
};

const PrintQrCodeModal = ({ isOpen, onOpenChange, orderCode }: Props) => {
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const appUrl = process.env.NEXT_PUBLIC_APP_URL!;

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size='lg'>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className='flex flex-col gap-1'>
              QR-Code drucken
            </ModalHeader>
            <ModalBody>
              <div className='border-1 p-4'>
                <ComponentToPrint
                  appUrl={appUrl}
                  qrCode={orderCode.id}
                  ref={componentRef}
                />
              </div>
              <Button color='primary' onClick={handlePrint}>
                QR-Code drucken
              </Button>
            </ModalBody>
            <ModalFooter></ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default PrintQrCodeModal;
