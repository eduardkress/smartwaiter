import {MenuItem2} from "@/types/menuItem2";

export interface Menu {
    id: number;
    categoryName: string;
    img: string;
    items: Array<MenuItem2>;
}