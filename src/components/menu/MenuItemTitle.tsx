"use client";
import * as React from "react";
import { Fragment, useEffect, useState } from "react";
import { Button, Tooltip } from "@nextui-org/react";
import Info from "@/components/icons/Info";
//import { allergens } from '@/components/ui/allergen';
import { Product, Allergen } from "@/types/restaurant";

type Props = {
  product: Product;
  allergens: Allergen[] | undefined;
};

function MenuItemTitle({ product, allergens }: Props) {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const onScroll = () => {
    setIsTooltipOpen(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [isTooltipOpen]);

  return (
    <Fragment>
      {product.name}
      {allergens && allergens.length > 0 && (
        <sup className="text-base font-light">
          <Tooltip
            content={allergens.map((allergen, i) => (
              <React.Fragment key={i}>
                {allergen.description}
                <br />
              </React.Fragment>
            ))}
            isOpen={isTooltipOpen}
            onOpenChange={(open) => setIsTooltipOpen(open)}
          >
            <Button
              isIconOnly
              variant="faded"
              size="sm"
              radius="full"
              className="translate-x-[-4px] translate-y-[-0px] border-transparent bg-transparent"
              onClick={() => setIsTooltipOpen((prevState) => !prevState)}
            >
              <Info />
            </Button>
          </Tooltip>
        </sup>
      )}
    </Fragment>
  );
}

export default MenuItemTitle;
