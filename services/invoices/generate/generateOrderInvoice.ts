import {useState} from "react";
import AxiosInstance from "@/lib/AxiosInstance";

export interface GenerateOrderInvoiceResponse {
    success: boolean;
    error?: string;
}

function GenerateOrderInvoice() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Function to generate an order invoice
    const generateOrderInvoice = async (orderId: string): Promise<GenerateOrderInvoiceResponse> => {
        setLoading(true);
        setError(null);
        try {
            const response = await AxiosInstance.post(`/api/Invoices/generate/${orderId}`);
            if (response.status !== 200) {
                throw new Error('Failed to generate invoice for order');
            }
            return response.data;
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Failed to generate invoice');
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        generateOrderInvoice
    }
}

export default GenerateOrderInvoice;