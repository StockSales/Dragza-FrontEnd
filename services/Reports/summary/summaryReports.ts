import {useState} from "react";
import AxiosInstance from "@/lib/AxiosInstance";

function useSummaryReports() {
    const [loading, setLoading] = useState(false);
    const [summaryReports, setSummaryReports] = useState([]);

    // Function to fetch Summarys reports
    const fetchSummaryReports = async (url: string) => {
        setLoading(true);
        try {
            // Simulate an API call to fetch Summarys reports
            const response = await AxiosInstance.get(`/api/reports/summary?${url}`); // Replace with your actual API endpoint
            if (response.status !== 200) {
                throw new Error('Failed to fetch Summary reports');
            }
            setSummaryReports(response.data);
        } catch (error) {
            console.error('Error fetching Summary reports:', error);
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        summaryReports,
        fetchSummaryReports
    };
}

export default useSummaryReports;