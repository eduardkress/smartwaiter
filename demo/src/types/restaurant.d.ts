export interface Restaurant {
  brand: Brand;
  rating: Rating;
  location: Location;
  restaurantId: string;
  colophon: Colophon;
  menu: Menu;
}

export interface Brand {
  name: string;
  branchName: string;
  chainId: string;
  description: string[];
  slogan: string;
  logoUrl: string;
  headerImageUrl: string;
}

export interface Colophon {
  branchName: string;
  restaurantName: string;
  streetName: string;
  streetNumber: string;
  postalCode: string;
  city: string;
  legalEntity: string;
  legalRepresentativeName: string;
  legalName: string;
  legalEntityClass: string;
  email: string;
  fax: string;
  chamberOfCommerce: any[];
  vatNumber: string;
  disputeResolutionLink: string;
}

export interface Location {
  streetName: string;
  streetNumber: string;
  postalCode: string;
  city: string;
  country: string;
  lat: string;
  lng: string;
  timeZone: string;
}

export interface Menu {
  currency: Currency;
  categories: Category[];
  optionGroups: { [key: string]: OptionGroup };
  options: { [key: string]: Option };
  products: { [key: string]: Product };
  allergens: { [key: string]: Allergen };
  popularProductIds: string[];
  discounts: Discount[];
}

export interface Category {
  id: string;
  name: string;
  description: string[];
  imageUrl: string;
  overviewImageUrl: null;
  timeRestrictions: { [key: string]: TimeRestriction[] };
  productIds: string[];
}

export interface TimeRestriction {
  start: number;
  end: number;
  formattedStart: string;
  formattedEnd: string;
}

export interface Currency {
  denominator: number;
  code: string;
}

export interface Discount {
  type: string;
  name: string;
  description: string;
  dayOfWeek: null;
  promotionPrice: null;
  absoluteAmount: number;
  percentageAmount: null;
  areSideDishesIncluded: boolean;
  isAppliedToEveryOccurrence: boolean;
  nthOccurrence: null;
  startFromAmount: null;
  shippingTypes: ShippingType[];
  productGroups: Array<string[]>;
}

export enum ShippingType {
  Delivery = 'DELIVERY',
  Pickup = 'PICKUP'
}

export interface OptionGroup {
  id: string;
  name: string;
  isTypeMulti: boolean;
  isRequired: boolean;
  minChoices: number;
  maxChoices: number;
  optionIds: string[];
}
export interface Option {
  id: string;
  name: string;
  minAmount: number;
  maxAmount: number;
  prices: Prices;
  metric: Metric;
  priceUnit: PriceUnit | null;
  pricePerUnitPickup: null;
  pricePerUnitDelivery: null;
  alcoholVolume: null;
  caffeineAmount: null;
  isSoldOut: boolean;
  isExcludedFromMov: boolean;
}

export interface Metric {
  unit: Unit | null;
  quantity: number | null;
}

export enum Unit {
  G = 'g',
  Ml = 'ml'
}

export enum PriceUnit {
  Kilogram = 'kilogram',
  Liter = 'liter'
}

export interface Prices {
  delivery: number;
  pickup: number;
  deposit: number | null;
}

export interface Variant {
  id: string;
  name: string | null;
  optionGroupIds: string[];
  shippingTypes: ShippingType[];
  prices: Prices;
  metric: Metric;
  priceUnit: PriceUnit | null;
  pricePerUnitPickup: number | null;
  pricePerUnitDelivery: number | null;
  alcoholVolume: null | string;
  caffeineAmount: null | string;
  isSoldOut: boolean;
  isExcludedFromMov: boolean;
}

export interface Product {
  id: string;
  name: string;
  description: string[];
  imageUrl: null | string;
  variants: Variant[];
  allergenIds: string[];
}

export interface Rating {
  votes: number;
  score: number;
}

export interface Allergen {
  id: string;
  description: string;
}
