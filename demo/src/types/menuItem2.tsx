export interface MenuItem2 {
  id: number;
  title: string;
  prices: Array<{variation:string,price:number}>;
  img: string;
  desc: string;
  allergens?: string;
}
