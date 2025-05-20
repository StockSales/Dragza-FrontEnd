import {useState} from "react";
import AxiosInstance from "@/lib/AxiosInstance";

function useCreateProductPrice() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isCreated, setIsCreated] = useState<boolean>(false);

    const createProductPrice = async (data: {
        productId: string;
        categoryId: string;
        purchasePrice: number;
        salesPrice: number;
    }) => {
        setLoading(true);
        setError(null);

        await AxiosInstance.post("/api/ProductPrices", data).then((response) => {
            if (![200, 201, 204].includes(response.status)) {
                throw new Error('Failed to create product price');
            }
            setIsCreated(true);
        }).catch ((err) => {
            const apiErrors = err?.response?.data?.errors;
            if (apiErrors && typeof apiErrors === "object") {
                const firstKey = Object.keys(apiErrors)[0];
                const firstMessage = apiErrors[firstKey][0];
                setError(`${firstKey}: ${firstMessage}`);
            } else {
                setError("An unexpected error occurred.");
            }
        }).finally(() => {
            setLoading(false);
        })
    };

    return {
        loading,
        error,
        isCreated,
        createProductPrice,
    };

}

export default useCreateProductPrice;