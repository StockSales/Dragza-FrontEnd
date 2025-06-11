import {useState} from "react";
import {Price} from "@/types/price";
import AxiosInstance from "@/lib/AxiosInstance";
import Cookies from "js-cookie";

function useGettingPricesForInventoryManager() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [prices, setPrices] = useState<Price[]>([]);

    const gettingPricesForInventoryManager = async () => {
        setLoading(true);
        setError(null);
        await AxiosInstance.get('/api/ProductPrices/my-prices')
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error('Failed to fetch prices');
                }
                setPrices(response.data)
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return {
        loading,
        error,
        prices,
        gettingPricesForInventoryManager
    }

}

export default useGettingPricesForInventoryManager;