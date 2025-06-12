import {useState} from "react";
import AxiosInstance from "@/lib/AxiosInstance";

function useGettingMainCategoryById() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [mainCategory, setMainCategory] = useState<any[]>([]);

    const getAllMainCategory = async (id: string | string[] | undefined) => {
        setLoading(true);
        setError(null);
        await AxiosInstance.get(`/api/MainCategories/${id}`)
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error('Failed to fetch main categories');
                }
                setMainCategory(response.data);
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return { mainCategory, loading, error, getAllMainCategory };
}

export default useGettingMainCategoryById;