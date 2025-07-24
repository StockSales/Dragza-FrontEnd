import {useState} from "react";
import AxiosInstance from "@/lib/AxiosInstance";

function useUploadCsv() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const uploadCSV = async (file: File) => {
        setLoading(true);
        setError(null);
        try {
            const formData = new FormData();
            formData.append('file', file);
            const response = await AxiosInstance.post('/api/Products/import-excel', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.status !== 200) {
                throw new Error('Failed to upload file');
            }
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Failed to upload file');
        } finally {
            setLoading(false);
        }
    };

    return {loading, error, uploadCSV};
}

export default useUploadCsv;