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

export interface OrderItem {
    id: number;
    item: string;
    tax: string;
    delivery: string;
    qty: number;
    price: number;
    total: number;
}

export interface ItemsTableProps {
    items: OrderItem[];
    deletedItems: number[];
    onDeleteItem: (itemId: number) => void;
}

export interface BillSummaryProps {
    items: OrderItem[];
    deletedItems: number[];
    defaultItems: OrderItem[];
}