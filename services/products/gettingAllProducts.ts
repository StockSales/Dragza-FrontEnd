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
        `/api/Products?includeDeleted=${includeDeleted}&lang=3&pageNumber=1&pageSize=50`
      );

      if (firstResponse.status === 200 || firstResponse.status === 201) {
        const totalPages = firstResponse.data.pagination.totalPages;
        let allProducts = [...firstResponse.data.data];

        // Fetch remaining pages in parallel
        if (totalPages > 1) {
          const pagePromises = [];
          for (let page = 2; page <= totalPages; page++) {
            pagePromises.push(
              AxiosInstance.get(
                `/api/Products?includeDeleted=${includeDeleted}&lang=3&pageNumber=${page}&pageSize=50`
              )
            );
          }

          const responses = await Promise.all(pagePromises);
          responses.forEach((res) => {
            if (res.status === 200 || res.status === 201) {
              allProducts = [...allProducts, ...res.data.data];
            }
          });
        }

        setProducts(allProducts);
      } else {
        const firstKey = Object.keys(firstResponse.data.errors)[0];
        const firstMessage = firstResponse.data.errors[firstKey][0];
        setError(`${firstKey}: ${firstMessage}`);
      }
    } catch (err: any) {
      const apiErrors = err?.response?.data?.errors;
      if (apiErrors && typeof apiErrors === "object") {
        const firstKey = Object.keys(apiErrors)[0];
        const firstMessage = apiErrors[firstKey][0];
        setError(`${firstKey}: ${firstMessage}`);
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
