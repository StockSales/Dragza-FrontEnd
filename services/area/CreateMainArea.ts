import {useState} from "react";
import AxiosInstance from "@/lib/AxiosInstance";
import {MainArea} from "@/types/areas";

function useCreateMainArea() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Function to create a new main area
    const createMainArea = async (areaData: MainArea) => {
        setLoading(true);
        setError(null);

        await AxiosInstance.post("/api/Regions", areaData).then((res) =>{
        if (res.status !== 200) {
            throw new Error("Failed to create main area");}
        }).catch((error) => {
            setError(error.message);
        }).finally(() => {
            setLoading(false);
        });
    };

    return ({
        createMainArea,
        loading,
        error
    })
}

export default useCreateMainArea;