import { useState } from "react";
import AxiosInstance from "@/lib/AxiosInstance";

function addProductsByExcel() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const addProductsByExcel = async (
        file: File,
        returnFile: boolean = false
    ) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const formData = new FormData();
            formData.append("file", file);

            const response = await AxiosInstance.post(
                `/api/Products/add-products-from-excel?returnFile=${returnFile}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (response.status === 200) {
                setSuccess(true);
                return { success: true, data: response.data };
            } else {
                throw new Error("Upload failed");
            }
        } catch (error: any) {
            const errorMessage =
                error?.response?.data?.message ||
                error?.message ||
                "Failed to upload file";
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        success,
        addProductsByExcel,
    };
}

export default addProductsByExcel;