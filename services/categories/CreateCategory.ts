import {useState} from "react";
import AxiosInstance from "@/lib/AxiosInstance";
import {CategoryType} from "@/types/category";

function useCreateCategory() {
    const [loading, setLoading] = useState(true)
    const [isCreated, setIsCreated] = useState(false)

    const creatingCategory = async (data: CategoryType) => {
        setLoading(true)
        await AxiosInstance.post("/api/Categories", data).then((response) => {
            if (response.data !== null || response.status === 200 || response.status === 201) {
                setIsCreated(true)
            }
            if (response.data === null || response.data == undefined || response.status !== 201) {
                setIsCreated(false)
                throw new Error ("There is something went wrong")
            }
        }).catch((err) => {
            return err.response?.data?.message || err.message
        }).finally(() => {
            setLoading(false)
        })
    }

    return {isCreated, loading, creatingCategory}
}

export default useCreateCategory;