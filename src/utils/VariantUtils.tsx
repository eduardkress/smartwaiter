import { Discount, Variant } from "@/types/restaurant";
import { Fragment, ReactElement } from "react";
import { EURO } from "@/utils/currencies";

function getCurrentValidPrice(
  variant: Variant,
  discounts: Discount[] | undefined,
  dayNumber: number,
  time: number,
): number {
  const currentDiscount =
    variant.discountId && discounts
      ? discounts.find(
          (discount) =>
            discount.id === variant.discountId &&
            discount.daysOfWeek.includes(dayNumber) &&
            discount.from <= time &&
            discount.until >= time,
        )?.discount ?? 0
      : 0;

  return variant.prices.onsite - currentDiscount;
}

const VariantUtils: {
  sortVariantsByPriceAsc: (variants: Variant[]) => Variant[];
  getLowestPrice: (variants: Variant[]) => number;
  getLowestPriceTag: (
    variants: Variant[],
    discounts: Discount[] | undefined,
  ) => ReactElement;
  getCurrentPriceTag: (
    variant: Variant,
    discounts: Discount[] | undefined,
  ) => ReactElement;
} = {
  sortVariantsByPriceAsc: function (variants) {
    return [...variants].sort((a, b) => a.prices.onsite - b.prices.onsite);
  },
  getLowestPrice: function (variants) {
    return variants.reduce((previousValue, currentValue) =>
      previousValue.prices.onsite > currentValue.prices.onsite
        ? currentValue
        : previousValue,
    ).prices.onsite;
  },
  getLowestPriceTag: function (variants, discounts) {
    const variantWithLowestPrice = variants
      .reduce((previousValue, currentValue) =>
        previousValue.prices.onsite < currentValue.prices.onsite
          ? previousValue
          : currentValue,
      );
    return this.getCurrentPriceTag(variantWithLowestPrice, discounts)
  },
  getCurrentPriceTag: function (variant, discounts) {
    const time =
      new Date(Date.now()).getHours() * 100 + new Date(Date.now()).getMinutes();
    let dayNumber = new Date(Date.now()).getDay();
    if (dayNumber === 0) {
      //json => Monday = 1 // Sunday = 7
      dayNumber = 7;
    }

    const currentValidPrice = getCurrentValidPrice(variant, discounts, dayNumber, time);

    return variant.prices.onsite !==
    currentValidPrice ? (
      <Fragment>
        {EURO.formatCents(currentValidPrice)}
        <span className="inline pl-1.5 text-sm text-red-600 line-through">
          {EURO.formatCents(variant.prices.onsite)}
        </span>
      </Fragment>
    ) : (
      <Fragment>
        {EURO.formatCents(variant.prices.onsite)}
      </Fragment>
    );
  }
};

export { VariantUtils };
