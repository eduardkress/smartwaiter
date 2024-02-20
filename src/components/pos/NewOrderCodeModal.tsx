'use client';
import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from '@nextui-org/react';
import SpinnerIcon from './SpinnerIcon';
import { OrderCode, OrderCodeInput } from '@/API';
import { toast } from 'sonner';

type Props = {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
  createOrderCodeFn: (orderCodeInput: OrderCodeInput) => Promise<OrderCode | null>;
};

const NewOrderCodeModal = ({ isOpen, onOpenChange, createOrderCodeFn }: Props) => {
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className='flex flex-col gap-1'>Bestellcode anlegen</ModalHeader>
            <ModalBody>
              <Input
                isRequired
                type='text'
                label='Tisch'
                placeholder='Gib einen Tischnamen ein'
                value={value}
                onValueChange={setValue}
              />
              <Button
                color='primary'
                isLoading={isLoading}
                onClick={() => {
                  setIsLoading(true);
                  createOrderCodeFn({
                    deskId: value,
                    isActive: true,
                  } as OrderCodeInput)
                    .then((data) => {
                      if (!data) {
                        toast.error('Bestellcode konnte nicht angelegt werden. Bitte versuche es später erneut!');
                      }
                    })
                    .catch(() => {
                      toast.error('Bestellcode konnte nicht angelegt werden. Bitte versuche es später erneut!');
                    })
                    .finally(() => {
                      setIsLoading(false);
                      setValue('');
                      onClose();
                    });
                }}
                isDisabled={value.length < 1}
                spinner={<SpinnerIcon />}
              >
                Bestellcode anlegen
              </Button>
            </ModalBody>
            <ModalFooter></ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default NewOrderCodeModal;
