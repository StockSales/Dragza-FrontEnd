import { useState } from "react";
import AxiosInstance from "@/lib/AxiosInstance";

function useDeleteUser() {
    const [loading, setLoading] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);

    const deleteUser = async (userId: string | number) => {
        setLoading(true);
        setIsDeleted(false);
        await fetch(`/api/Users/delete-user`, {
            method: "POST",
            headers: {
                "Accept": "text/plain",
            },
            body: JSON.stringify(userId),
        } )
            .then((response) => {
                if (response.status === 200 || response.status === 204) {
                    setIsDeleted(true);
                } else {
                    throw new Error("There is something went wrong");
                }
            })
            .catch((err) => {
                console.error(err.response?.data?.message || err.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return { isDeleted, loading, deleteUser };
}

export default useDeleteUser;
