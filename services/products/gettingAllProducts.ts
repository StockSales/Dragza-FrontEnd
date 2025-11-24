import { useState } from "react";
import { ProductType } from "@/types/product";
import AxiosInstance from "@/lib/AxiosInstance";

function useGettingAllProducts() {
  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [includeDeletedState, setIncludeDeletedState] =
    useState<string>("false");

  const getAllProducts = async (includeDeleted: string) => {
    setLoading(true);
    setError(null);
    setIncludeDeletedState(includeDeleted);

    try {
      // Fetch first page to get total pages
      const firstResponse = await AxiosInstance.get(
        `/api/Products?includeDeleted=${includeDeleted}&lang=1&pageNumber=1&pageSize=50`
      );

      console.log("First Response:", firstResponse); // Debug log


      if (firstResponse.status === 204) {
        setProducts([]);
        setLoading(false);
        return;
      }

      if (firstResponse.status === 200 || firstResponse.status === 201) {
        // Check if data exists
        if (!firstResponse.data || !firstResponse.data.data) {
          setProducts([]);
          setLoading(false);
          return;
        }

        const totalPages = firstResponse.data.pagination?.totalPages || 1;
        let allProducts = [...firstResponse.data.data];

        // Fetch remaining pages in parallel
        if (totalPages > 1) {
          const pagePromises = [];
          for (let page = 2; page <= totalPages; page++) {
            pagePromises.push(
              AxiosInstance.get(
                `/api/Products?includeDeleted=${includeDeleted}&lang=1&pageNumber=${page}&pageSize=50`
              )
            );
          }

          const responses = await Promise.all(pagePromises);
          responses.forEach((res) => {
            if ((res.status === 200 || res.status === 201) && res.data?.data) {
              allProducts = [...allProducts, ...res.data.data];
            }
          });
        }

        setProducts(allProducts);
      } else {
        // Handle error responses
        if (firstResponse.data?.errors) {
          const firstKey = Object.keys(firstResponse.data.errors)[0];
          const firstMessage = firstResponse.data.errors[firstKey]?.[0] || "Unknown error";
          setError(`${firstKey}: ${firstMessage}`);
        } else {
          setError("An unexpected error occurred.");
        }
      }
    } catch (err: any) {
      console.error("Error fetching products:", err); // Debug log

      // Better error handling
      if (err?.response?.status === 404) {
        setError("Products endpoint not found.");
      } else if (err?.response?.status === 401) {
        setError("Unauthorized. Please log in again.");
      } else if (err?.response?.status === 403) {
        setError("Access forbidden.");
      } else if (err?.response?.data?.errors) {
        const apiErrors = err.response.data.errors;
        const firstKey = Object.keys(apiErrors)[0];
        const firstMessage = apiErrors[firstKey]?.[0] || "Unknown error";
        setError(`${firstKey}: ${firstMessage}`);
      } else if (err?.message) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    getAllProducts,
    loading,
    error,
    products,
    includeDeleted: includeDeletedState,
    setIncludeDeletedState,
  };
}

export default useGettingAllProducts;