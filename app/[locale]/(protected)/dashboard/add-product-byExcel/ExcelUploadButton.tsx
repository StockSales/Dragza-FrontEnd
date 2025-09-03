"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, FileSpreadsheet } from "lucide-react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import useAddProductsByExcel from "@/services/products/csv/addProductByExcel";

interface ExcelUploadButtonProps {
    onSuccess?: () => void;
}

const ExcelUploadButton = ({ onSuccess }: ExcelUploadButtonProps) => {
    const t = useTranslations("productList");
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Use the service hook
    const { loading, addProductsByExcel } = useAddProductsByExcel();

    const handleFileSelect = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // Validate file type
        const validTypes = ["application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "text/csv"];

        if (!validTypes.includes(file.type) && !file.name.endsWith(".xlsx") && !file.name.endsWith(".xls") && !file.name.endsWith(".csv")) {
            toast.error(t("invalidFileType") || "Please select a valid Excel or CSV file");
            return;
        }

        try {
            const result = await addProductsByExcel(file, false);

            if (result.success) {
                toast.success(t("excelUploadSuccess") || "Products imported successfully!");
                onSuccess?.();

                // Reset the file input
                if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                }
            } else {
                throw new Error(result.error || "Upload failed");
            }
        } catch (error: any) {
            console.error("Upload error:", error);
            toast.error(error?.message || t("excelUploadError") || "Failed to import products. Please check your file format.");
        }
    };

    return (
        <>
            <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={handleFileChange}
                style={{ display: "none" }}
            />

            <Button
                onClick={handleFileSelect}
                disabled={loading}
                size="md"
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white border-green-600 hover:border-green-700 transition-colors duration-200"
            >
                {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                    <FileSpreadsheet className="w-4 h-4" />
                )}
                {loading ? "Uploading..." : "Import from Excel"}
            </Button>
        </>
    );
};

export default ExcelUploadButton;