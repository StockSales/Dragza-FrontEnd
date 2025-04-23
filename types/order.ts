export type OrderData = {
    id: string | number;
    order: number;
    customer: {
        name: string;
        image: string;
    };
    date: string;
    quantity: number;
    amount: string;
    method: string;
    order_status: "accepted" | "pending" | "rejected";
    status: "paid" | "due" | "canceled";
    action: React.ReactNode;
}