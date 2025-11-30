import { useState } from "react";
import AxiosInstance from "@/lib/AxiosInstance";
import { OrderStatus, StatusPathMap } from "@/enum";

function useUpdateOrderStatus() {
    const [loading, setLoading] = useState(false);

    const updateOrderStatus = async (
        id: string | string[] | undefined,
        status: OrderStatus
    ): Promise<{ success: boolean; error?: string }> => {
        setLoading(true);
        try {
            const statusPath = StatusPathMap[status];

            if (!statusPath) {
                throw new Error("Unsupported status");
            }

            const url = `/api/Orders/${statusPath}/${id}`;
            console.log("REQUEST URL:", url);

            const response = await AxiosInstance.put(url);

            if (response.status !== 204) {
                throw new Error("Failed to update order status");
            }

            return { success: true };
        } catch (error: any) {
            return { success: false, error: error.message };
        } finally {
            setLoading(false);
        }
    };

    return { updateOrderStatus, loading };
}

export default useUpdateOrderStatus;
