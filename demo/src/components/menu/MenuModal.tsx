import { CategoryItem } from '@/types/categoryItem';
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

type Props = {
  item: CategoryItem;
  isOpen: boolean;
  onOpenChange: () => void;
};

const MenuModal = ({ item, isOpen, onOpenChange }: Props) => {
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
              {!!item.img && (
                <Hero
                  imgSrc={item.img}
                  heroAlt={''}
                  tailwindClasses={'h-64 drop-shadow-md'}
                />
              )}

              <div className='container flex flex-col items-center space-y-3 bg-white py-4'>
                <h2 className='text-2xl font-bold leading-6 text-gray-900'>
                  <MenuItemTitle item={item} />
                </h2>
                <div className='flex flex-col items-center space-y-2 pb-3 '>
                  <div className='text-center text-base font-normal'>
                    {item.desc}
                  </div>
                  <div className='text-center text-sm font-normal'>
                    Zutaten: Teig, Dies das und so
                  </div>
                  <div className='pt-3 text-center text-lg font-bold'>
                    {item.prices.length === 1 ? (
                      <Fragment>{item.prices[0].price} €</Fragment>
                    ) : (
                      <table className='table-auto border-spacing-x-2'>
                        {item.prices.map((value, i) => {
                          return (
                            <tr key={'variation' + i}>
                              <th className='pr-4 text-left'>
                                {value.variation}
                              </th>
                              <th className='text-right'>{value.price} €</th>
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
