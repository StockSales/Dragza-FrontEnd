import React from 'react';
import AxiosInstance from "@/lib/AxiosInstance";

function useDeleteProductById() {
    // getting all products

    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [isDeleted, setIsDeleted] = React.useState<boolean>(false);

    const deleteProductById = async (id: string | undefined) => {
        setLoading(true);
        setError(null);
        await AxiosInstance.delete(`/api/Products/${id}`).then((response) => {
            if (![200, 201, 204].includes(response.status)) {
                throw new Error('Failed to delete product');
            }
            setIsDeleted(true);
        }).catch ((err) => {
            setError(err.message);
        }).finally(() => {
            setLoading(false);
        })
    };

    return { deleteProductById, loading, error, isDeleted };
}

export default useDeleteProductById;