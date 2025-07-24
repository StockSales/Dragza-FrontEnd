"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner"; // or use your toast lib

type CSVUploadModalProps = {
    onUpload: (file: File) => Promise<void>; // Accepts a CSV file, uploads it
};

export function CSVUploadModal({ onUpload }: CSVUploadModalProps) {
    const [open, setOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [error, setError] = useState("");
    const [isUploading, setIsUploading] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.type === "text/xlsx" || file.name.endsWith(".xlsx")) {
                setSelectedFile(file);
                setError("");
            } else {
                setSelectedFile(null);
                setError("Only files are allowed.");
            }
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setError("Please select a file.");
            return;
        }

        try {
            setIsUploading(true);
            await onUpload(selectedFile);
            toast.success("File uploaded successfully!");
            setOpen(false);
            setSelectedFile(null);
        } catch (err) {
            toast.error("Upload failed.");
            console.error(err);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Upload File</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Upload File</DialogTitle>
                </DialogHeader>

                <Input type="file" accept=".xlsx,text/xlsx" onChange={handleFileChange} />
                {error && <p className="text-sm text-red-500 mt-1">{error}</p>}

                <DialogFooter className="pt-4">
                    <Button disabled={isUploading} onClick={handleUpload}>
                        {isUploading ? "Uploading..." : "Upload"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
