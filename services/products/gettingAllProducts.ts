import {useState} from 'react';
import {ProductType} from "@/types/product";
import AxiosInstance from "@/lib/AxiosInstance";

function useGettingAllProducts() {
    const [loading, setLoading] = useState<boolean>(false);
    const [products, setProducts] = useState<ProductType[]>([]);
    const [error, setError] = useState<string | null>(null);

    const getAllProducts = async () => {
        setLoading(true);
        setError(null);
        await AxiosInstance.get("/api/Products").then((res) => {
            if (res.status === 200 || res.status === 201 || !res.data.errors) {
                setProducts(res.data);
            } else {
                const firstKey = Object.keys(res.data.errors)[0];
                const firstMessage = res.data.errors[firstKey][0];
                setError(`${firstKey}: ${firstMessage}`);
            }
        }).catch((err) => {
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
    }

    return {
        getAllProducts,
        loading,
        error,
        products
    }

}

export default useGettingAllProducts;