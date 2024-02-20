import { CategoryItem } from "@/types/categoryItem";

export type MenuCategory = {
  id: number;
  categoryName: string;
  img: string;
  items: Array<CategoryItem>;
};
