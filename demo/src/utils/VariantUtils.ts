import { Variant } from '@/types/restaurant2';

const VariantUtils: {
  sortVariantsByPriceAsc: (variants: Variant[]) => Variant[];
  getLowestPrice:(variants: Variant[]) => number;
} = {
  sortVariantsByPriceAsc: function(variants) {
    return variants.sort((a, b) => a.prices.onsite - b.prices.onsite);
  },
  getLowestPrice: function(variants) {
    return variants.reduce((previousValue, currentValue) => previousValue.prices.onsite > currentValue.prices.onsite ? currentValue : previousValue).prices.onsite
  }
};

export { VariantUtils };
