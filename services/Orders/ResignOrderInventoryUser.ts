import React from 'react';
import AxiosInstance from "@/lib/AxiosInstance";

function UseResignOrderInventoryUser() {
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    const resignOrder = async (id: string | string[] | undefined, userId: string) => {
        setLoading(true);
        setError(null);
        await AxiosInstance.post(`/api/Orders/re-assign`, {
            orderId: id,
            userId: userId
        }).then((response) => {
            if (response.status !== 200) {
                throw new Error('Failed to update order');
            }
        }).catch((error) => {
            setError(error.message);
        }).finally(() => {
            setLoading(false);
        })
    }

    return { resignOrder, loading, error };
}

export default UseResignOrderInventoryUser;