import {Price} from "@/types/price";
import {CategoryType} from "@/types/category";

export type ProductType = {
    id?: string,
    name: string,
    preef: string,
    description: string,
    category: CategoryType,
    activeIngredient: string,
    prices?: Price[]
}