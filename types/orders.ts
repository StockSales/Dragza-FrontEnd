import {ProductType} from "@/types/product";

export type Orders = {
    id: string;
    pharmacyUserId: string
    inventoryUserId: string
    orderDate: string
    status: number
    totalAmount: number
    deliverDate: string
    items: OrderItem[]
}

export interface OrderItem {
    id: string;
    item: string;
    qty: number;
    price: number;
    total: number;
}

export interface ItemsTableProps {
    items: OrderItem[];
    deletedItems: number[];
    onDeleteItem: (id: string) => void;
}

export interface BillSummaryProps {
    items: OrderItem[];
    deletedItems: number[];
    defaultItems: OrderItem[];
}