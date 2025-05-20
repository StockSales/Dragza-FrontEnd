import {useState} from 'react';
import AxiosInstance from "@/lib/AxiosInstance";

function useUpdateProductById() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isUpdated, setIsUpdated] = useState<boolean>(false);

    const updatingProductById = async (id: string | string[] | undefined, updatedData: {
        name: string;
        preef: string;
        description: string;
        categoryId: string;
        activeIngredientId: string;
    }) => {
        setLoading(true);
        setError(null);

        await AxiosInstance.put(`/api/Products/${id}`, updatedData).then((response) => {
            if (![200, 201, 204].includes(response.status)) {
                throw new Error('Failed to update product');
            }
            setIsUpdated(true);
        }).catch ((error) => {
            setError(error.message);
        }).finally(() => {
            setLoading(false);
        })
    };

    return { updatingProductById, loading, error, isUpdated };
}

export default useUpdateProductById;