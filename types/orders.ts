import {ProductType} from "@/types/product";

export type Orders = {
    id: string;
    pharmacyUserId: string;
    pharmacyName?: string;
    inventoryUserName?: string;
    inventoryUserId: string;
    orderDate: string;
    status: number
    totalAmount: number
    deliverDate: string
    items: OrderItem[]
}

export interface OrderItem {
    productId: string;
    productName: string;
    productPriceId: string;
    quantity?: number;
    unitPrice?: number;
    total?: number;
}

export interface ItemsTableProps {
    items: OrderItem[];
    deletedItems: string[];
    onDeleteItem: (id: string) => void;
}

export interface BillSummaryProps {
    items: OrderItem[];
    deletedItems: string[];
    defaultItems?: OrderItem[];
}