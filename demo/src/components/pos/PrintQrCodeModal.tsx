import React, { useEffect, useState, useRef } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input
} from '@nextui-org/react';
import SpinnerIcon from './SpinnerIcon';
import OrderCode from '@/appSync/graphql/orderCode/OrderCode';
import { useReactToPrint } from 'react-to-print';
import { ComponentToPrint } from './ComponentToPrint';

type Props = {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
  orderCode: OrderCode;
};

const PrintQrCodeModal = ({
  isOpen,
  onOpen,
  onOpenChange,
  orderCode
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  });
  let appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://192.168.3.46:3000';

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size='lg'>
      <ModalContent>
        {(onClose) => (
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
              <Button
                color='primary'
                isLoading={isLoading}
                onClick={handlePrint}
                spinner={<SpinnerIcon />}
              >
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
