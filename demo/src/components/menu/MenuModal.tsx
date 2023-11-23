import React, { Fragment, useEffect, useState } from 'react';
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter
} from '@nextui-org/react';
import Hero from '@/components/menu/Hero';
import MenuItemTitle from '@/components/menu/MenuItemTitle';
import { Menu, Product } from '@/types/restaurant';
import Minus from '../icons/Minus';
import Plus from '../icons/Plus';
import MenuModalItemExtras from '@/components/menu/MenuModalItemExtras';

type Props = {
  menu: Menu;
  product: Product;
  isOpen: boolean;
  onOpenChange: () => void;
};

interface OptionsDataObject {
  [key: string]: string[];
}

const MenuModal = ({ menu, product, isOpen, onOpenChange }: Props) => {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [selectedOptions, setSelectedOptions] = useState<OptionsDataObject>({});

  const [itemCounter, setItemCounter] = useState(1);
  const [itemPrice, setItemPrice] = useState(selectedVariant.prices.pickup);

  useEffect(() => {
    //if variant is changed then reset itemCounter and seletedOptions
    setItemCounter(1);
    Object.keys(selectedOptions).forEach((key) => {
      setSelectedOptions((prevData) => ({
        ...prevData,
        [key]: []
      }));
    });
  }, [selectedVariant]);

  useEffect(() => {
    console.log(selectedOptions);
    let endPrice = selectedVariant.prices.pickup;
    Object.values(selectedOptions).forEach((optionsIds) => {
      optionsIds.forEach((optionid) => {
        let option = menu.options[optionid];
        if (option) {
          endPrice = endPrice + option.prices.pickup;
        }
      });
    });
    endPrice = endPrice * itemCounter;
    setItemPrice(endPrice);
  }, [selectedVariant, selectedOptions, itemCounter]);

  const handleVariantChange = (variantId: string) => {
    let variant = product.variants.find((variant) => variant.id === variantId);
    //Select first variant if variant with variantId is not present
    if (!variant) variant = product.variants[0];
    setSelectedVariant(variant);
  };

  const decreaseItemCounter = () => {
    if (itemCounter - 1 > 0) {
      setItemCounter(itemCounter - 1);
    }
  };
  const increaseItemCounter = () => {
    if (itemCounter + 1 < 99) {
      setItemCounter(itemCounter + 1);
    }
  };

  return (
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
            <ModalBody>
              {!!product.imageUrl && (
                <Hero
                  imgSrc={product.imageUrl}
                  heroAlt={''}
                  tailwindClasses={'h-64 drop-shadow-md z-[-1]'}
                />
              )}

              <div className='container flex max-h-[50vh] flex-col space-y-3 overflow-y-auto bg-white py-4'>
                <h2 className='text-2xl font-bold leading-6 text-gray-900'>
                  <MenuItemTitle product={product} />
                </h2>
                <div className='flex flex-col space-y-2 pb-3 '>
                  <div className='text-base font-normal'>
                    {product.description}
                  </div>
                  <div className='text-sm font-normal'>
                    Zutaten: Teig, Dies das und so
                  </div>
                  <div className='pt-3 text-lg font-normal'>
                    {product.variants.length === 1 ? (
                      <Fragment>{product.variants[0].prices.pickup} €</Fragment>
                    ) : (
                      <>
                        {/*Variant Dropdown*/}
                        <div>{product.name}:</div>
                        <Dropdown>
                          <DropdownTrigger>
                            <Button variant='bordered' className='w-full'>
                              {selectedVariant.name}
                            </Button>
                          </DropdownTrigger>
                          <DropdownMenu
                            items={product.variants}
                            onAction={(key) =>
                              handleVariantChange(key.toString())
                            }
                          >
                            {(variant) => (
                              <DropdownItem key={variant.id}>
                                {variant.name}
                              </DropdownItem>
                            )}
                          </DropdownMenu>
                        </Dropdown>
                        {/*OptionGroups*/}
                        {selectedVariant.optionGroupIds
                          .map((optionGroupId) => {
                            return menu.optionGroups[optionGroupId];
                          })
                          .filter(
                            (optionGroup) =>
                              optionGroup !== null && optionGroup !== undefined
                          )
                          .map((optionGroup, index) => {
                            {
                              /*Options*/
                            }
                            return (
                              <div key={index} className='mt-4'>
                                <div className='font-normal'>
                                  {optionGroup.name}
                                </div>
                                {optionGroup.isTypeMulti &&
                                  (() => {
                                    const filteredOptions =
                                      optionGroup.optionIds
                                        .map((optionId) => {
                                          return menu.options[optionId];
                                        })
                                        .filter(
                                          (option) =>
                                            option !== null &&
                                            option !== undefined
                                        );

                                    return (
                                      <MenuModalItemExtras options={filteredOptions} selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions} optionGroupId={optionGroup.id} />
                                    );
                                  })()}
                              </div>
                            );
                          })}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <div className='flex w-full items-center gap-x-2'>
                <Button
                  isIconOnly
                  disabled={itemCounter <= 1}
                  className='text-md cursor-default snap-center rounded-full bg-gray-200 p-3 font-bold  shadow-sm hover:bg-gray-300 sm:cursor-pointer'
                  onClick={() => decreaseItemCounter()}
                >
                  <Minus />
                </Button>
                <div>{itemCounter}</div>
                <Button
                  isIconOnly
                  className='text-md cursor-default snap-center rounded-full bg-gray-200 p-3 font-bold text-black shadow-sm hover:bg-gray-300 sm:cursor-pointer'
                  onClick={() => increaseItemCounter()}
                >
                  <Plus />
                </Button>
                <Button
                  radius={'full'}
                  className='text-md flex-grow bg-black px-8 py-7 font-bold text-white'
                >
                  {itemPrice / 100} €
                </Button>
              </div>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default MenuModal;
