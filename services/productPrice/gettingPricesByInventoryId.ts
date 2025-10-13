import { useState } from "react";
import { Price } from "@/types/price";
import AxiosInstance from "@/lib/AxiosInstance";

interface FetchPricesResponse {
  success: boolean;
  data?: Price[];
  hasFailedEntries?: boolean;
  failedEntriesFile?: string | null;
  error?: string;
}

function useGettingPricesByInventoryId() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [prices, setPrices] = useState<Price[]>([]);

  const gettingPricesByInventoryId = async (
    inventoryId: string | string[] | undefined,
    returnFile: boolean = false
  ): Promise<FetchPricesResponse> => {
    setLoading(true);
    setError(null);

    try {
      const response = await AxiosInstance.get(
        `/api/ProductPrices/by-inventory-user/${inventoryId}?returnFile=${returnFile}`,
        {
          responseType: returnFile ? "blob" : "json",
        }
      );

      if (response.status === 200) {
        const contentType = response.headers["content-type"];
        const contentDisposition = response.headers["content-disposition"];

        let downloadedFile = null;

        // Check if response is a file (failed entries)
        if (
          contentType?.includes("spreadsheet") ||
          contentType?.includes("excel") ||
          contentDisposition?.includes("attachment")
        ) {
          // Extract filename from content-disposition header
          let filename = "Failed_Prices.xlsx";
          if (contentDisposition) {
            const filenameMatch = contentDisposition.match(
              /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
            );
            if (filenameMatch?.[1]) {
              filename = filenameMatch[1].replace(/['"]/g, "");
            }
          }

          // Create blob and download file
          const blob = new Blob([response.data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });
          const url = window.URL.createObjectURL(blob);

          try {
            const link = document.createElement("a");
            link.href = url;
            link.download = filename;
            document.body.appendChild(link);
            link.click();

            // Cleanup
            setTimeout(() => {
              document.body.removeChild(link);
              window.URL.revokeObjectURL(url);
            }, 100);

            downloadedFile = filename;
          } catch (downloadError) {
            window.URL.revokeObjectURL(url);
            console.error(
              "Failed to download failed entries file:",
              downloadError
            );
          }
        } else {
          // Normal JSON response
          setPrices(response.data);
        }

        return {
          success: true,
          data: response.data,
          hasFailedEntries: !!downloadedFile,
          failedEntriesFile: downloadedFile,
        };
      }

      throw new Error("Failed to fetch prices");
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to fetch prices";
      setError(errorMessage);

      return {
        success: false,
        error: errorMessage,
        hasFailedEntries: false,
      };
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    prices,
    gettingPricesByInventoryId,
  };
}

export default useGettingPricesByInventoryId;
