import React, {useState} from 'react';
import AxiosInstance from "@/lib/AxiosInstance";

function useGettingAllActiveIngredient() {
    // states for active ingredient
    const [loading, setLoading] = useState(false);
    const [activeIngredients, setActiveIngredients] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);

    // function to get all active ingredients
    const gettingAllActiveIngredients = async () => {
        setLoading(true);
        await AxiosInstance.get('/api/ActiveIngredients').then((response) => {
            if (response.status != 200 ) {
                throw new Error ("Error getting active ingredients");
            }
            setActiveIngredients(response.data);
        }).catch((err) => {
            setError(err.message);
        }).finally(() => {
            setLoading(false);
        })
    }

    return {activeIngredients, loading, error, gettingAllActiveIngredients};
}

export default useGettingAllActiveIngredient;