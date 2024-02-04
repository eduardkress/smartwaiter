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
  ModalFooter,
  ScrollShadow,
} from '@nextui-org/react';
import Hero from '@/components/menu/Hero';
import MenuItemTitle from '@/components/menu/MenuItemTitle';
import { Menu, Product, Option } from '@/types/restaurant2';
import Minus from '../icons/Minus';
import Plus from '../icons/Plus';
import MenuModalItemExtras from '@/components/menu/MenuModalItemExtras';
import { addToBasket } from './Basket';
import { EURO } from '@/utils/currencies';
import { SiteSlot } from '@/components/slotting/SiteSlot';
import { SiteType } from '@/types/SiteType';
import MenuModalItemExtrasSingleWaiter from '@/components/menu/MenuModalItemExtrasSingleWaiter';

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
  const [itemPrice, setItemPrice] = useState(selectedVariant.prices.onsite);

  //if variant is changed then reset itemCounter and seletedOptions
  useEffect(() => {
    setItemCounter(1);
    setSelectedOptions(() => ({}));
  }, [selectedVariant]);

  //Recalculate price if variant, item count or options change
  useEffect(() => {
    let endPrice = selectedVariant.prices.onsite;
    Object.values(selectedOptions).forEach((optionsIds) => {
      optionsIds.forEach((optionId) => {
        const option = menu.options.find((value) => value.id === optionId);
        if (option) {
          endPrice = endPrice + option.prices.onsite;
        }
      });
    });
    endPrice = endPrice * itemCounter;
    setItemPrice(endPrice);
  }, [selectedVariant, selectedOptions, itemCounter, menu]);

  const handleVariantChange = (variantId: string) => {
    let variant = product.variants.find((variant) => variant.id === variantId);
    if (!variant) variant = product.variants[0];
    setSelectedVariant(variant);
  };

  const handleOptionsChange = (optionGroupId: string, seletedOptions: string[]) => {
    if (seletedOptions.length == 0) {
      const optionGroups = { ...selectedOptions };
      delete optionGroups[optionGroupId];
      setSelectedOptions(optionGroups);
    } else {
      setSelectedOptions((current) => ({
        ...current,
        [optionGroupId]: seletedOptions,
      }));
    }
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

  const handleAddToBasket = () => {
    const optionIds = Object.values(selectedOptions).reduce((acc, values) => acc.concat(values), []);
    addToBasket(product.id, selectedVariant.id, optionIds, itemCounter, '');
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement={'center'}
      size={'xl'}
      classNames={{
        body: 'px-0 py-0',
        footer: 'bg-[#f5f3f1]',
        closeButton: 'bg-white',
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalBody>
              {!!product.imageUrl && (
                <Hero imgSrc={product.imageUrl} heroAlt={''} tailwindClasses={'h-56 drop-shadow-md z-[-1]'} />
              )}

              <ScrollShadow className='container flex max-h-[50vh] flex-col space-y-3 overflow-y-auto bg-white py-4'>
                <h2 className='text-2xl font-bold leading-6 text-gray-900'>
                  <MenuItemTitle
                    product={product}
                    allergens={product.allergenIds!.map((id) => menu.allergens.find((value) => value.id === id)!)}
                  />
                </h2>
                <div className='flex flex-col space-y-2 pb-3 '>
                  <div className='text-base font-normal'>{product.description}</div>
                  <div className='text-sm font-normal'>Zutaten: Teig, Dies das und so TODO</div>
                  <div className='pt-3 text-lg font-normal'>
                    {product.variants.length === 1 ? (
                      EURO.formatCents(product.variants[0].prices.onsite)
                    ) : (
                      <Fragment>
                        {/*Variant Dropdown*/}
                        <div>{product.name}:</div>
                        <Dropdown>
                          <DropdownTrigger>
                            <Button variant='bordered' className='w-full'>
                              {selectedVariant.name + ' (' + EURO.formatCents(selectedVariant.prices.onsite) + ')'}
                            </Button>
                          </DropdownTrigger>
                          <DropdownMenu
                            items={product.variants}
                            onAction={(key) => handleVariantChange(key.toString())}
                            aria-label='Select Product Variation'
                          >
                            {(variant) => (
                              <DropdownItem key={variant.id}>
                                {variant.name + ' (' + EURO.formatCents(variant.prices.onsite) + ')'}
                              </DropdownItem>
                            )}
                          </DropdownMenu>
                        </Dropdown>
                      </Fragment>
                    )}

                    {/*OptionGroupsRework*/}
                    {selectedVariant.optionGroupIds &&
                      selectedVariant.optionGroupIds
                        .map((optionGroupId) =>
                          menu.optionGroups.find((optionGroup) => optionGroup.id === optionGroupId)
                        )
                        .map(
                          (optionGroup, index) =>
                            optionGroup &&
                            optionGroup.optionIds.length > 0 && (
                              <div key={index} className='mt-4'>
                                <div className='font-normal'>{optionGroup.name}</div>
                                {(() => {
                                  const filteredOptions = optionGroup.optionIds
                                    .map((optionId) => menu.options.find((option) => option.id === optionId))
                                    .filter((option): option is Option => !!option);
                                  return <Fragment>
                                    { optionGroup.isTypeMulti &&
                                      <MenuModalItemExtras
                                        options={filteredOptions}
                                        handleOptionsChange={handleOptionsChange}
                                        optionGroupId={optionGroup.id}
                                      />
                                    }
                                    { !optionGroup.isTypeMulti &&
                                      <MenuModalItemExtrasSingleWaiter
                                        options={filteredOptions}
                                        handleOptionsChange={handleOptionsChange}
                                        optionGroupId={optionGroup.id}
                                      />
                                    }
                                  </Fragment>;
                                })()}
                              </div>
                            )
                        )}
                  </div>
                </div>
              </ScrollShadow>
            </ModalBody>
            <ModalFooter>
              <SiteSlot siteType={SiteType.Waiter}>
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
                    onClick={() => {
                      handleAddToBasket();
                      onClose();
                    }}
                  >
                    {EURO.formatCents(itemPrice)}
                  </Button>
                </div>
              </SiteSlot>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default MenuModal;
