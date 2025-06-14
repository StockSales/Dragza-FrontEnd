import {useState} from "react";
import AxiosInstance from "@/lib/AxiosInstance";

function useInvoiceReports() {
    const [loading, setLoading] = useState(false);
    const [invoicesReports, setInvoiceReports] = useState([]);

    // Function to fetch Invoices reports
    const fetchInvoiceReports = async (url: string) => {
        setLoading(true);
        try {
            // Simulate an API call to fetch Invoices reports
            const response = await AxiosInstance.get(`/api/reports/invoices?${url}`); // Replace with your actual API endpoint
            if (response.status !== 200) {
                throw new Error('Failed to fetch Invoices reports');
            }
            setInvoiceReports(response.data);
        } catch (error) {
            console.error('Error fetching Invoices reports:', error);
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        invoicesReports,
        fetchInvoiceReports
    };
}

export default useInvoiceReports;