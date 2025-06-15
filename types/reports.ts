// types/reports.ts
import {OrderStatus, PaymentMethod} from "@/enum";

export interface InvoiceReportItem {
    id: string;
    invoiceNumber: string;
    date: string;
    pharmacyName?: string;
    inventoryName?: string;
    regionName?: string;
    status: OrderStatus;
    paymentMethod: PaymentMethod;
    totalAmount: number;
}

export interface PaginatedInvoiceReports {
    items: InvoiceReportItem[];
    totalCount: number;
    pageNumber: number;
    pageSize: number;
    totalPages: number;
}

export interface SummaryReport {
    totalSales: number;
    totalCash: number;
    totalCredit: number;
    totalOrders: number;
    totalInvoices: number;
}