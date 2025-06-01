"use client";

import React from "react";
import {Button} from "@/components/ui/button";
import {toast} from "sonner";

type ExportCSVProps<T> = {
    data: T[];
    config?: {
        filename?: string;
        delimiter?: string;
        headers?: (keyof T)[];
    };
};

export function ExportCSVButton<T extends Record<string, any>>({
                                                                   data,
                                                                   config,
                                                               }: ExportCSVProps<T>) {
    const handleExport = () => {
        if (!data || data.length === 0) {
            toast.error("There is no data to export.")
            return;
        }

        const delimiter = config?.delimiter || ",";
        const headers = config?.headers || (Object.keys(data[0]) as (keyof T)[]);

        const csvRows = [];

        // Create CSV header row
        csvRows.push(headers.join(delimiter));

        // Create data rows
        for (const row of data) {
            const values = headers.map((key) => {
                const value = row[key];
                // Escape double quotes and wrap in quotes if needed
                const safe = typeof value === "string" ? `"${value.replace(/"/g, '""')}"` : value;
                return safe;
            });
            csvRows.push(values.join(delimiter));
        }

        const csvString = csvRows.join("\n");

        // Create a blob and download it
        const blob = new Blob([csvString], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = config?.filename || "export.csv";
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <Button
            variant="default"
            onClick={handleExport}
        >
            Export CSV
        </Button>
    );
}