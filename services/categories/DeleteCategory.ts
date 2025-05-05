import { useState } from "react";
import AxiosInstance from "@/lib/AxiosInstance";

function useDeleteCategoryById() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const deleteCategoryById = async (id: string | string[] | undefined) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await AxiosInstance.delete(`/api/Categories/${id}`);

            if (response.status === 200) {
                setSuccess(true);
            } else {
                throw new Error("Something went wrong");
            }
        } catch (err: any) {
            setError(err.response?.data?.message || err.message);
            throw new Error(err.response?.data?.message || err.message);
        } finally {
            setLoading(false);
        }
    };

    return { deleteCategoryById, loading, success, error };
}

export default useDeleteCategoryById;

