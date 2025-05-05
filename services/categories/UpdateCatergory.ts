import { useState } from "react";
import { CategoryType } from "@/types/category";
import AxiosInstance from "@/lib/AxiosInstance";

function useUpdateCategoryById() {
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState<CategoryType>({
        description: "",
        name: "",
        pref: ""
    });
    const [error, setError] = useState<string | null>(null);

    const updatingCategoryById = async (id: string | string[] | undefined, updatedData: CategoryType) => {
        setLoading(true);
        setError(null);

        try {
            const response = await AxiosInstance.put(`/api/Categories/${id}`, updatedData);

            if (response.status === 200 && response.data !== null) {
                setCategory(response.data); 
            } else {
                throw new Error("Something went wrong");
            }
        } catch (err: any) {
            setError(err.response?.data?.message || err.message);
        } finally {
            setLoading(false);
        }
    };

    return { category, loading, error, updatingCategoryById };
}

export default useUpdateCategoryById;
