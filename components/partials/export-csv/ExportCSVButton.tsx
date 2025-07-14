"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import useDownloadCsv from "@/services/products/csv/downloadCSV";

export function ExportCSVButton() {
    const { loading, error, downloadCSV } = useDownloadCsv();

    const handleClick = async () => {
        try {
            await downloadCSV();
            if (!error) {
                toast.success("CSV downloaded successfully");
            } else {
                throw new Error(error);
            }
        } catch (e) {
            toast.error("Failed to download CSV");
        }
    };

    return (
        <Button onClick={handleClick} disabled={loading}>
            {loading ? "Exporting..." : "Export CSV"}
        </Button>
    );
}