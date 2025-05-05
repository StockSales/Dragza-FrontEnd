import axiosInstance from "@/lib/AxiosInstance";

type LoginCredentials = {
    email: string;
    password: string;
};

export const loginWithCredentials = async (credentials: LoginCredentials) => {
    try {
        const response = await axiosInstance.post("/api/Users/login", credentials);

        if (response.status === 200) {
            const { role, token } = response.data;

            // Save role (and optionally token) to localStorage
            localStorage.setItem("userRole", role);
            localStorage.setItem("authToken", token || "");

            return response.data;
        }

        throw new Error("Login failed");
    } catch (error: any) {
        throw new Error(error.response?.data?.message || error.message);
    }
};