import {ProductType} from "@/types/product";

export interface ActiveIngredient {
    id: number;
    name: string;
    products: ProductType[];
}