import { useState } from "react";
import GetUsers from "@/services/users/GetAllUsers";

function useDeactivateUser() {
  const { gettingAllUsers } = GetUsers();
  const [loading, setLoading] = useState(false);
  const [isDeactivated, setIsDeactivated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Deactivates a user by ID and refreshes the users list.
   * @param userId - ID of the user to deactivate
   */
  const deactivateUser = async (
    userId: string | number
  ): Promise<{ success: boolean; error?: string }> => {
    setLoading(true);
    setIsDeactivated(false);
    setError(null);

    try {
      const response = await fetch("/api/Users/deActive-user", {
        method: "POST",
        headers: {
          "Accept": "text/plain",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userId),
      });

      if (response.ok) {
        gettingAllUsers();
        setIsDeactivated(true);
        return { success: true };
      } else {
        const message = await response.text();
        throw new Error(message || "Something went wrong");
      }
    } catch (err: any) {
      setError(err.message);
      setIsDeactivated(false);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return {
    deactivateUser,
    isDeactivated,
    loading,
    error,
  };
}

export default useDeactivateUser;
