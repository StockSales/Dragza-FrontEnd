import {ProductType} from "@/types/product";

export type Orders = {
    id: string;
    pharmacyUserId: string
    inventoryUserId: string
    orderDate: string
    status: number
    totalAmount: number
    deliverDate: string
    items: ProductType[]
}