import React, { Fragment, useEffect, useRef, useState } from "react";
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
} from "@nextui-org/react";
import Hero from "@/components/menu/Hero";
import MenuItemTitle from "@/components/menu/MenuItemTitle";
import { Menu, Option, Product } from "@/types/restaurant";
import Minus from "../icons/Minus";
import Plus from "../icons/Plus";
import MenuModalItemExtras from "@/components/menu/MenuModalItemExtras";
import { addToBasket } from "./Basket";
import { EURO } from "@/utils/currencies";
import { SiteSlot } from "@/components/slotting/SiteSlot";
import { SiteType } from "@/types/siteType";
import MenuModalItemExtrasSingleWaiter from "@/components/menu/MenuModalItemExtrasSingleWaiter";
import { VariantUtils } from "@/utils/VariantUtils";
import Cross from "../icons/Cross";

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
  const modalRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const headerTextRef = useRef<HTMLDivElement | null>(null);

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

  const handleOptionsChange = (
    optionGroupId: string,
    seletedOptions: string[]
  ) => {
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
    const optionIds = Object.values(selectedOptions).reduce(
      (acc, values) => acc.concat(values),
      []
    );
    addToBasket(product.id, selectedVariant.id, optionIds, itemCounter, "");
  };

  const handleScroll = (event: any) => {
    if (
      !modalRef.current ||
      !imageRef.current ||
      !headerRef.current ||
      !headerTextRef.current
    )
      return;
    //Set Opacity of Image based on scroll
    const modalTop = modalRef.current.getBoundingClientRect().top;
    const imageBottom = imageRef.current.getBoundingClientRect().bottom;
    const imageHeight = imageRef.current.getBoundingClientRect().height;
    const headerHeight = headerRef.current.getBoundingClientRect().height;

    const distanceFromTopToBottom = imageBottom - headerHeight - modalTop;

    let visiblePercent = (distanceFromTopToBottom / imageHeight) * 100;
    if (visiblePercent > 100) visiblePercent = 100;
    if (visiblePercent < 0) visiblePercent = 0;

    // Reduce Opacity from Image on scroll
    const threshold = 40;
    if (visiblePercent < threshold) {
      imageRef.current.style.opacity =
        100 - (threshold - visiblePercent) * 2 + "%";
    } else {
      imageRef.current.style.opacity = "100%";
    }

    // Animate Header
    const newThreshold = 20;
    if (visiblePercent < newThreshold) {
      const step = 100 / newThreshold;

      headerRef.current.style.opacity =
        step * (newThreshold - visiblePercent) + "%";
      headerTextRef.current.style.opacity =
        step * (newThreshold - visiblePercent) + "%";
      headerTextRef.current.style.transform = `translateY(-${visiblePercent / 100}rem)`;
    } else {
      headerRef.current.style.opacity = "0%";
      headerTextRef.current.style.opacity = "0%";
      headerTextRef.current.style.transform = "translateY(-0.75rem)";
    }
  };

  return (
    <Modal
      ref={modalRef}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement={"auto"}
      size={"xl"}
      hideCloseButton
      classNames={{
        body: "px-0 py-0",
        footer: "bg-[#f5f3f1]",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <div className="relative">
            {/*Implement own header*/}
            <Fragment>
              <div className="absolute top-0 h-20 w-full z-20 flex items-center justify-between px-6">
                <div></div>
                <div ref={headerTextRef} className="font-bold opacity-0">
                  {product.name}
                </div>
                <Button
                  isIconOnly
                  className="rounded-full bg-white font-bold text-black cursor-pointer p-3"
                  onClick={() => {
                    onClose();
                  }}
                >
                  <Cross />
                </Button>
              </div>
              <div
                ref={headerRef}
                className="absolute top-0 h-20 w-full z-10 flex items-center justify-between px-6 shadow-xl bg-white opacity-0"
              />
            </Fragment>

            <div
              className="relative max-h-[80vh] overflow-y-auto"
              onScroll={(event) => {
                handleScroll(event);
              }}
            >
              <ModalBody className="relative">
                <div className="relative">
                  {!!product.imageUrl && (
                    <div
                      ref={imageRef}
                      className={`w-full h-56 bg-cover`}
                      style={{
                        backgroundImage: "url(" + product.imageUrl + ")",
                      }}
                    />
                  )}
                  <div className="container flex flex-col space-y-3  bg-white py-4">
                    <h2 className="text-2xl font-bold leading-6 text-gray-900">
                      <MenuItemTitle
                        product={product}
                        allergens={product.allergenIds?.map(
                          (id) =>
                            menu.allergens.find((value) => value.id === id)!
                        )}
                      />
                    </h2>
                    <div className="flex flex-col space-y-2 pb-3 ">
                      <div className="text-base font-normal">
                        {product.description}
                      </div>
                      {/*<div className='text-sm font-normal'>Zutaten: Teig, Dies das und so TODO</div>*/}
                      <SiteSlot siteType={SiteType.Landing}>
                        <div className="pt-3 pb-2 text-lg font-bold">
                          {product.variants.length === 1 ? (
                            EURO.formatCents(product.variants[0].prices.onsite)
                          ) : (
                            <table className="table-auto border-spacing-x-2">
                              <tbody>
                                {VariantUtils.sortVariantsByPriceAsc(
                                  product.variants
                                ).map((value, i) => {
                                  return (
                                    <tr key={"variation" + i}>
                                      <th className="pr-4 text-left">
                                        {value.name}
                                      </th>
                                      <th className="text-right">
                                        {VariantUtils.getCurrentPriceTag(
                                          value,
                                          menu.discounts
                                        )}
                                      </th>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          )}
                        </div>
                        {/*OptionGroupsRework*/}
                        {selectedVariant.optionGroupIds &&
                          selectedVariant.optionGroupIds
                            .map((optionGroupId) =>
                              menu.optionGroups.find(
                                (optionGroup) =>
                                  optionGroup.id === optionGroupId
                              )
                            )
                            .map(
                              (optionGroup, index) =>
                                optionGroup &&
                                optionGroup.optionIds.length > 0 && (
                                  <div key={index} className="pt-2">
                                    <div className="font-bold">
                                      {optionGroup.name}
                                      {!optionGroup.isTypeMulti &&
                                        " (Auswahl aus einer Option)"}
                                    </div>
                                    {(() => {
                                      const filteredOptions =
                                        optionGroup.optionIds
                                          .map((optionId) =>
                                            menu.options.find(
                                              (option) => option.id === optionId
                                            )
                                          )
                                          .filter(
                                            (option): option is Option =>
                                              !!option
                                          );
                                      return (
                                        <Fragment>
                                          {filteredOptions
                                            .map(
                                              (value) =>
                                                value.name +
                                                (value.prices.onsite > 0
                                                  ? ` (+${EURO.formatCents(
                                                      value.prices.onsite
                                                    )})`
                                                  : "")
                                            )
                                            .join(", ")}
                                        </Fragment>
                                      );
                                    })()}
                                  </div>
                                )
                            )}
                      </SiteSlot>
                      <SiteSlot siteType={SiteType.Waiter}>
                        <div className="pt-3 text-lg font-normal">
                          {product.variants.length === 1 ? (
                            EURO.formatCents(product.variants[0].prices.onsite)
                          ) : (
                            <Fragment>
                              {/*Variant Dropdown*/}
                              <div>{product.name}:</div>
                              <Dropdown>
                                <DropdownTrigger>
                                  <Button variant="bordered" className="w-full">
                                    {selectedVariant.name +
                                      " (" +
                                      EURO.formatCents(
                                        selectedVariant.prices.onsite
                                      ) +
                                      ")"}
                                  </Button>
                                </DropdownTrigger>
                                <DropdownMenu
                                  items={product.variants}
                                  onAction={(key) =>
                                    handleVariantChange(key.toString())
                                  }
                                  aria-label="Select Product Variation"
                                >
                                  {(variant) => (
                                    <DropdownItem key={variant.id}>
                                      {variant.name +
                                        " (" +
                                        EURO.formatCents(
                                          variant.prices.onsite
                                        ) +
                                        ")"}
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
                                menu.optionGroups.find(
                                  (optionGroup) =>
                                    optionGroup.id === optionGroupId
                                )
                              )
                              .map(
                                (optionGroup, index) =>
                                  optionGroup &&
                                  optionGroup.optionIds.length > 0 && (
                                    <div key={index} className="mt-4">
                                      <div className="font-normal">
                                        {optionGroup.name}
                                      </div>
                                      {(() => {
                                        const filteredOptions =
                                          optionGroup.optionIds
                                            .map((optionId) =>
                                              menu.options.find(
                                                (option) =>
                                                  option.id === optionId
                                              )
                                            )
                                            .filter(
                                              (option): option is Option =>
                                                !!option
                                            );
                                        return (
                                          <Fragment>
                                            {optionGroup.isTypeMulti && (
                                              <MenuModalItemExtras
                                                options={filteredOptions}
                                                handleOptionsChange={
                                                  handleOptionsChange
                                                }
                                                optionGroupId={optionGroup.id}
                                              />
                                            )}
                                            {!optionGroup.isTypeMulti && (
                                              <MenuModalItemExtrasSingleWaiter
                                                options={filteredOptions}
                                                handleOptionsChange={
                                                  handleOptionsChange
                                                }
                                                optionGroupId={optionGroup.id}
                                              />
                                            )}
                                          </Fragment>
                                        );
                                      })()}
                                    </div>
                                  )
                              )}
                        </div>
                      </SiteSlot>
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <SiteSlot siteType={SiteType.Waiter}>
                  <div className="flex w-full items-center gap-x-2">
                    <Button
                      isIconOnly
                      disabled={itemCounter <= 1}
                      className="text-md cursor-default snap-center rounded-full bg-gray-200 p-3 font-bold  shadow-sm hover:bg-gray-300 sm:cursor-pointer"
                      onClick={() => decreaseItemCounter()}
                    >
                      <Minus />
                    </Button>
                    <div>{itemCounter}</div>
                    <Button
                      isIconOnly
                      className="text-md cursor-default snap-center rounded-full bg-gray-200 p-3 font-bold text-black shadow-sm hover:bg-gray-300 sm:cursor-pointer"
                      onClick={() => increaseItemCounter()}
                    >
                      <Plus />
                    </Button>
                    <Button
                      radius={"full"}
                      className="text-md flex-grow bg-black px-8 py-7 font-bold text-white"
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
            </div>
          </div>
        )}
      </ModalContent>
    </Modal>
  );
};

export default MenuModal;
