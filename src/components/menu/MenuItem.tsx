import * as React from "react";
import { Fragment, useState } from "react";
import Image from "next/image";
import MenuModal from "@/components/menu/MenuModal";
import { Skeleton, useDisclosure } from "@nextui-org/react";
import MenuItemTitle from "@/components/menu/MenuItemTitle";
import { Menu, Product } from "@/types/restaurant";
import { VariantUtils } from "@/utils/VariantUtils";

type Props = {
  menu: Menu;
  product: Product;
};

export function MenuItem({ menu, product }: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div>
      <div className="max-w-5xl mx-auto px-2 xl:px-0">
        <div
          className="mx-auto flex max-w-5xl cursor-pointer flex-row justify-between gap-x-6 rounded-lg border border-gray-300 bg-white p-4 shadow hover:bg-[#f5f5f5]"
          onClick={onOpen}
        >
          <div className="flex flex-col gap-y-2">
            <h3 className="text-base font-bold sm:text-lg">
              <MenuItemTitle
                product={product}
                allergens={product.allergenIds?.map((id) => {
                  return menu.allergens.find((value) => value.id === id)!;
                })}
              />
            </h3>
            {!!product.description && (
              <div className="text-sm font-normal md:text-base">
                {product.description}
              </div>
            )}
            {product.variants.length > 1 && (
              <div className="text-sm">
                Wahl aus:{" "}
                {VariantUtils.sortVariantsByPriceAsc(product.variants)
                  .map((value) => value.name)
                  .join(", ")}
              </div>
            )}
            <div className="flex flex-grow flex-col-reverse text-base font-bold">
              {product.variants.length > 1 ? (
                <Fragment>
                  ab{" "}
                  {VariantUtils.getLowestPriceTag(
                    product.variants,
                    menu.discounts
                  )}
                </Fragment>
              ) : (
                VariantUtils.getLowestPriceTag(product.variants, menu.discounts)
              )}
            </div>
          </div>
          {/*TODO: Bild beim Mobile vllt einfach weg? Man sieht iwie eh nicht viel dann lieber in dem Modal*/}
          {product.imageUrl && (
            <div className="relative hidden size-40 shrink-0 rounded-lg border shadow sm:block">
              <div className="absolute inset-0">
                {(() => {
                  const [isLoaded, setIsLoaded] = useState(false);
                  return (
                    <Fragment>
                      <Skeleton
                        className="h-full w-full rounded-lg"
                        isLoaded={isLoaded}
                      />
                      <Image
                        className="rounded-lg"
                        src={product.imageUrl}
                        alt="Item1"
                        sizes="160px"
                        fill
                        style={{ objectFit: "cover" }}
                        onLoad={() => setIsLoaded(true)}
                      />
                    </Fragment>
                  );
                })()}
              </div>
            </div>
          )}
        </div>
      </div>
      <MenuModal
        menu={menu}
        product={product}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
    </div>
  );
}

export default MenuItem;
