import { Discount, Variant } from '@/types/restaurant2';
import { Fragment, ReactElement } from 'react';
import { EURO } from '@/utils/currencies';

const VariantUtils: {
  sortVariantsByPriceAsc: (variants: Variant[]) => Variant[];
  getLowestPrice: (variants: Variant[]) => number;
  getLowestPriceTag: (variants: Variant[], discounts: Discount[] | undefined) => ReactElement;
} = {
  sortVariantsByPriceAsc: function (variants) {
    return [...variants].sort((a, b) => a.prices.onsite - b.prices.onsite);
  },
  getLowestPrice: function (variants) {
    return variants.reduce((previousValue, currentValue) =>
      previousValue.prices.onsite > currentValue.prices.onsite ? currentValue : previousValue
    ).prices.onsite;
  },
  getLowestPriceTag: function (variants, discounts) {
    // TODO: How failsafe do we want to make this?
    // TODO: Refactor this
    const time = new Date(Date.now()).getHours() * 100 + new Date(Date.now()).getMinutes();
    const dayNumber = new Date(Date.now()).getDay() + 1;

    const lowestPriceWithDiscounts = variants.reduce((previousValue, currentValue) =>
      previousValue.prices.onsite -
        (previousValue.discountId && discounts
          ? discounts.find(
              (value) =>
                value.id === previousValue.discountId &&
                value.daysOfWeek.includes(dayNumber) &&
                value.from <= time &&
                value.until >= time
            )?.discount ?? 0
          : 0) >
      currentValue.prices.onsite -
        (currentValue.discountId && discounts
          ? discounts.find(
              (value) =>
                value.id === currentValue.discountId &&
                value.daysOfWeek.includes(dayNumber) &&
                value.from <= time &&
                value.until >= time
            )?.discount ?? 0
          : 0)
        ? currentValue
        : previousValue
    );
    return lowestPriceWithDiscounts.discountId &&
      discounts &&
      discounts.find(
        (value) =>
          value.id === lowestPriceWithDiscounts.discountId &&
          value.daysOfWeek.includes(dayNumber) &&
          value.from <= time &&
          value.until >= time
      ) ? (
      <Fragment>
        {EURO.formatCents(
          lowestPriceWithDiscounts.prices.onsite -
            (lowestPriceWithDiscounts.discountId
              ? discounts.find((value) => value.id === lowestPriceWithDiscounts.discountId)?.discount ?? 0
              : 0)
        )}
        <span className='inline pl-1.5 text-sm text-red-600 line-through'>
          {EURO.formatCents(lowestPriceWithDiscounts.prices.onsite)}
        </span>
      </Fragment>
    ) : (
      <Fragment>{EURO.formatCents(lowestPriceWithDiscounts.prices.onsite)}</Fragment>
    );
  },
};

export { VariantUtils };
