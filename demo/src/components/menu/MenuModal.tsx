import React, { Fragment } from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter
} from '@nextui-org/react';
import Hero from '@/components/menu/Hero';
import MenuItemTitle from '@/components/menu/MenuItemTitle';
import { Product } from '@/types/restaurant';

type Props = {
  product: Product;
  isOpen: boolean;
  onOpenChange: () => void;
};

const MenuModal = ({ product, isOpen, onOpenChange }: Props) => {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size={'lg'}
      classNames={{
        body: 'px-0 py-0',
        footer: 'bg-[#f5f3f1]'
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalBody>
              {!!product.imageUrl && (
                <Hero
                  imgSrc={product.imageUrl}
                  heroAlt={''}
                  tailwindClasses={'h-64 drop-shadow-md'}
                />
              )}

              <div className='container flex flex-col items-center space-y-3 bg-white py-4'>
                <h2 className='text-2xl font-bold leading-6 text-gray-900'>
                  <MenuItemTitle product={product} />
                </h2>
                <div className='flex flex-col items-center space-y-2 pb-3 '>
                  <div className='text-center text-base font-normal'>
                    {product.description}
                  </div>
                  <div className='text-center text-sm font-normal'>
                    Zutaten: Teig, Dies das und so
                  </div>
                  <div className='pt-3 text-center text-lg font-bold'>
                    {product.variants.length === 1 ? (
                      <Fragment>{product.variants[0].prices.pickup} €</Fragment>
                    ) : (
                      <table className='table-auto border-spacing-x-2'>
                        {product.variants.map((variant) => {
                          return (
                            <tr key={variant.id}>
                              <th className='pr-4 text-left'>{variant.name}</th>
                              <th className='text-right'>
                                {variant.prices.pickup} €
                              </th>
                            </tr>
                          );
                        })}
                      </table>
                    )}
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                onPress={onClose}
                className={
                  'w-full bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                }
              >
                Zurück
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default MenuModal;
