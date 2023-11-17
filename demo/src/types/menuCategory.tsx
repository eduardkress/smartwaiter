import { CategoryItem } from '@/types/categoryItem';

export interface MenuCategory {
  id: number;
  categoryName: string;
  img: string;
  items: Array<CategoryItem>;
}
