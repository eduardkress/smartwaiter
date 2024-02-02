export type Restaurant = {
  restaurantId: string;
  information: Information;
  hero: Hero;
  menu: Menu;
};

export type Information = {
  location: Location;
  contact: ContactDetails;
  openingHours: OpeningHours;
  delivery?: Delivery[];
  colophon: Colophon;
};

export type Location = {
  streetName: string;
  streetNumber: string;
  postalCode: string;
  city: string;
  country: string;
};

export type ContactDetails = {
  telephone: string;
  whatsapp?: string;
  mail?: string;
};

export type OpeningHours = {
  Monday?: string[];
  Tuesday?: string[];
  Wednesday?: string[];
  Thursday?: string[];
  Friday?: string[];
  Saturday?: string[];
  Sunday?: string[];
  Holidays?: string[];
};

export type Colophon =
  | ColophonOneManBusiness
  | ColophonPartnership
  | ColophonCorporation
  | ColophonFreelancer;

export type ColophonOneManBusiness = ColophonCommons & {
  //Einzelunternehmen (z.B. "Max Mustermann, Restaurantbetrieb")
  // Name und Anschrift des Restaurants (Inhaber)
  // Umsatzsteuer-Identifikationsnummer (falls vorhanden)
  // Handelsregister, falls eingetragen
  // Klarer Hinweis auf die Verantwortlichkeit (z.B. "Verantwortlich im Sinne des § 55 Abs. 2 RStV")
  businessType: 'OneManBusiness';
  owner: string;
  vatNumber?: string;
  registerChamber?: string;
  registerNumber?: string;
};

export type ColophonPartnership = ColophonCommons & {
  //Personengesellschaft  (z.B. GbR, OHG)
  // Name und Anschrift der Gesellschaft (Restaurant)
  // Namen und Anschriften aller Gesellschafter
  // Umsatzsteuer-Identifikationsnummer (falls vorhanden)
  // Handelsregister, falls eingetragen
  // Klarer Hinweis auf die Verantwortlichkeit (z.B. "Verantwortlich im Sinne des § 55 Abs. 2 RStV")
  businessType: 'Partnership';
  representativeNames: string[];
  vatNumber?: string;
  registerChamber?: string;
  registerNumber?: string;
};

export type ColophonCorporation = ColophonCommons & {
  //Kapitalgesellschaft (z.B. GmbH, AG)
  // Name und Anschrift der Gesellschaft (Restaurant GmbH)
  // Vertretungsberechtigte Personen (Geschäftsführer, Vorstand)
  // Umsatzsteuer-Identifikationsnummer (falls vorhanden)
  // Handelsregister, Registergericht und Registernummer
  // Angabe des Kapitals (bei GmbH und AG)
  // Klarer Hinweis auf die Verantwortlichkeit (z.B. "Verantwortlich im Sinne des § 55 Abs. 2 RStV")
  businessType: "Corporation";
  representativeNames: string[];
  vatNumber?: string;
  registerChamber: string;
  registerNumber: string;
};

export type ColophonFreelancer = ColophonCommons & {
  //Freiberufler (z.B. Einzelunternehmer mit gastronomischem Beruf)
  // Name und Anschrift des Freiberuflers (Restaurantbetrieb)
  // Berufsbezeichnung, verliehen in Deutschland
  // Kammerzugehörigkeit und entsprechende gesetzliche Berufsbezeichnung
  // Umsatzsteuer-Identifikationsnummer (falls vorhanden)
  // Klarer Hinweis auf die Verantwortlichkeit (z.B. "Verantwortlich im Sinne des § 55 Abs. 2 RStV")
  businessType: 'Freelancer';
  owner: string;
  vatNumber?: string;
};

type ColophonCommons = {
  companyName: string;
  location: Location;
  telephone: string;
  fax: string;
  email: string;
  contentResponsible: string;
};

export type Delivery = {
  deliveryZone?: string;
  minimumOrderValue: number;
  deliveryCost: number | string;
};

export type Hero = {
  name: string;
  description?: string[];
  slogan?: string;
  logoUrl: string;
  headerImageUrl: string;
};

export type Menu = {
  categories: Category[];
  options: Option[];
  optionGroups: OptionGroup[];
  products: Product[];
  allergens: Allergen[];
  discounts?: Discount[];
};

export type Category = {
  id: string;
  name: string;
  description?: string[];
  imageUrl?: string;
  productIds: string[];
  discountId?: string[];
};

export type Option = {
  id: string;
  name: string;
  minAmount: number;
  maxAmount: number;
  prices: Prices;
  isSoldOut?: boolean;
  isVegetarian?: boolean;
  isVegan?: boolean;
  alcoholVolume?: number;
  caffeineAmount?: number;
  allergenIds?: string[];
};

export type Prices = {
  onsite: number;
  delivery?: number;
  pickup?: number;
};

export type OptionGroup = {
  id: string;
  name: string;
  optionIds: string[];
  minChoices?: number;
  maxChoices?: number;
  isTypeMulti: boolean;
  isRequired?: boolean;
};

export type Product = {
  id: string;
  name: string;
  description?: string[];
  imageUrl?: string;
  variants: Variant[];
  allergenIds?: string[];
};

export type Variant = {
  id: string;
  name?: string;
  optionGroupIds?: string[];
  prices: Prices;
  isSoldOut?: boolean;
  isVegetarian?: boolean;
  isVegan?: boolean;
  alcoholVolume?: number;
  caffeineAmount?: number;
  discountId?: string;
};

export type Allergen = {
  id: string;
  description: string;
};

export type Discount = {
  id: string;
  name: string;
  description: string;
  daysOfWeek: number[];
  from: number;
  until: number;
  discount?: number;
  discountedOptionGroupId?: string[];
}
