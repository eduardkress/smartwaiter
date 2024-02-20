export type CategoryItem = {
  id: number;
  title: string;
  prices: Array<{ variation: string; price: number }>;
  img: string;
  desc: string;
  allergens?: string;
};
