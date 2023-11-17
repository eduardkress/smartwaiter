interface Currency {
  denominator: number;
  code: string;
}

interface TimeRestriction {
  start: number;
  end: number;
  formattedStart: string;
  formattedEnd: string;
}

interface Category {
  id: string;
  name: string;
  description: string[];
  imageUrl: string;
  timeRestrictions: Record<string, TimeRestriction[]>;
  productIds: string[];
}

interface OptionGroup {
  id: string;
  name: string;
  isTypeMulti: boolean;
  isRequired: boolean;
  minChoices: number;
  maxChoices: number;
  optionIds: string[];
}

interface Option {
  id: string;
  name: string;
  minAmount: number;
  maxAmount: number;
  prices: {
    delivery: number;
    pickup: number;
    deposit: number | null;
  };
  metric: {
    unit: string | null;
    quantity: number | null;
  };
  priceUnit: string | null;
  pricePerUnitPickup: string | null;
  pricePerUnitDelivery: string | null;
  alcoholVolume: number | null;
  caffeineAmount: number | null;
  isSoldOut: boolean;
  isExcludedFromMov: boolean;
}

interface ProductVariant {
  id: string;
  name: string;
  optionGroupIds: string[];
  shippingTypes: string[];
  prices: {
    delivery: number;
    pickup: number;
    deposit: number | null;
  };
  metric: {
    unit: string | null;
    quantity: number | null;
  };
  priceUnit: string | null;
  pricePerUnitPickup: string | null;
  pricePerUnitDelivery: string | null;
  alcoholVolume: number | null;
  caffeineAmount: number | null;
  isSoldOut: boolean;
  isExcludedFromMov: boolean;
}

interface Product {
  id: string;
  name: string;
  description: string[];
  imageUrl: string;
  variants: ProductVariant[];
}

interface Discount {
  type: string;
  name: string;
  description: string;
  dayOfWeek: string | null;
  promotionPrice: number | null;
  absoluteAmount: number | null;
  percentageAmount: number | null;
  areSideDishesIncluded: boolean;
  isAppliedToEveryOccurrence: boolean;
  nthOccurrence: number | null;
  startFromAmount: number | null;
  shippingTypes: string[];
  productGroups: string[][];
}

interface Menu {
  currency: Currency;
  categories: Category[];
  optionGroups: OptionGroup[];
  options: Option[];
  products: Product[];
  popularProductIds: string[];
  discounts: Discount[];
}
