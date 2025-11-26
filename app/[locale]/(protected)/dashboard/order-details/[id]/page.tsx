"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import TotalTable from "./totaltable";
import { Icon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { OrderData } from "@/types/order";
import { toast } from "sonner";
import { useRouter } from "@/i18n/routing";
import { OrderStatus, OrderStatusLabel, UserRoleLabel } from "@/enum";
import useGettingOrderById from "@/services/Orders/gettingOrderById";
import useGettingInvoiceByOrderId from "@/services/invoices/order/gettingInvoiceByOrderId";
import { Orders } from "@/types/orders";
import BillSummary from "@/app/[locale]/(protected)/dashboard/remove-item/[id]/BillSummary";
import { Loader2 } from "lucide-react";
import useUpdateOrderStatus from "@/services/Orders/updateOrderStatus";
import Cookies from "js-cookie";
import { useTranslations } from "next-intl";

const OrderDetails = () => {
    const t = useTranslations("orderDetailsPage");

    const params = useParams();
    const router = useRouter();

    const userType = Cookies.get("userRole");

    const id: string | string[] | undefined = params?.id;
    const [order, setOrder] = useState<Orders | null>(null);
    const [selectedStatus, setSelectedStatus] = useState<OrderStatus | null>(null);

    // getting order details
    const { order: orderData, getOrderById, error, loading: orderLoading } = useGettingOrderById()

    // getting Order Invoice By id
    const { loading: invoiceLoading, error: invoiceError, invoice, getInvoiceByOrderId } = useGettingInvoiceByOrderId()

    // updating order status
    const { loading: updateLoading, updateOrderStatus } = useUpdateOrderStatus()

    useEffect(() => {
        if (id) {
            getOrderById(id as string);
            getInvoiceByOrderId(id as string);
        }
    }, [id]);

    useEffect(() => {
        if (orderData) {
            setOrder(orderData);
            // Initialize selected status from the first item
            if (orderData.items && orderData.items.length > 0) {
                setSelectedStatus(orderData.items[0]?.status as OrderStatus);
            }
        }
    }, [orderData]);

    // Refresh order data when returning to the page
    useEffect(() => {
        if (id) {
            const refreshInterval = setInterval(() => {
                getOrderById(id as string);
            }, 30000); // Refresh every 30 seconds

            return () => clearInterval(refreshInterval);
        }
    }, [id]);

    if (orderLoading || invoiceLoading) {
        return (
            <div className="flex items-center justify-center h-full">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
        );
    }

    // Use order state if available, fallback to orderData
    const currentOrder = order || orderData;

    if (!currentOrder) {
        return (
            <div className="flex items-center justify-center h-full">
                <p>{t("noOrderFound")}</p>
            </div>
        );
    }

    const currentStatus = currentOrder.items?.[0]?.status as OrderStatus;
    const hasStatusChanged = selectedStatus !== null && selectedStatus !== currentStatus;

    return (
        <>
            {/* Order Status Update Card - Only for Inventory users */}
            {userType === "Inventory" && (
                <Card>
                    <CardHeader>
                        <CardTitle>{t("orderStatus")}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center flex-wrap gap-4">
                                <Label className="w-[150px] flex-none">{t("orderStatus")}: </Label>
                                <Select
                                    value={selectedStatus?.toString() ?? currentStatus?.toString()}
                                    onValueChange={(value: string) => {
                                        const numericValue = Number(value) as OrderStatus;
                                        setSelectedStatus(numericValue);
                                    }}
                                >
                                    <SelectTrigger className="flex-1 cursor-pointer">
                                        <SelectValue placeholder={t("updateStatus")} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>{t("status")}</SelectLabel>
                                            {Object.values(OrderStatus)
                                                .filter((value) => typeof value === "number")
                                                .map((status) => (
                                                    <SelectItem
                                                        key={status}
                                                        value={status.toString()}
                                                        disabled={status === OrderStatus.Pending}
                                                    >
                                                        {t(`statusOptions.${OrderStatus[status]}`)}
                                                    </SelectItem>
                                                ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex items-center justify-center flex-wrap gap-4">
                                <Button
                                    size="md"
                                    variant="outline"
                                    className="w-[150px] flex-none"
                                    type="button"
                                    disabled={
                                        updateLoading ||
                                        !hasStatusChanged ||
                                        selectedStatus === OrderStatus.Pending ||
                                        selectedStatus === null
                                    }
                                    onClick={async () => {
                                        if (!id || selectedStatus === null || selectedStatus === OrderStatus.Pending) {
                                            toast.warning(t("invalidStatusSelected"));
                                            return;
                                        }

                                        const result = await updateOrderStatus(id as string, selectedStatus);

                                        if (result.success) {
                                            toast.success(t("updateStatusSuccess"));
                                            await getOrderById(id as string); // Refresh data
                                            setSelectedStatus(null); // Reset selection after update
                                        } else {
                                            toast.error(result.error || t("updateStatusError"));
                                        }
                                    }}
                                >
                                    {updateLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : t("updateStatus")}
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Order Details Card */}
            <Card>
                <CardHeader className="border-0">
                    <div className="flex justify-between flex-wrap gap-4 items-center">
                        <div>
                            <span className="block text-default-900 font-medium text-xl">{t("orderDetails")}</span>
                            <div className="text-default-500 font-normal mt-4 text-sm">
                                {t("pharmacyName")}: {currentOrder.pharmacyName || 'N/A'}
                                <div className="flex space-x-2 mt-2">
                                    <p>{t("inventoryManger")}:</p>
                                    <span>
                                        {currentOrder.items?.length > 0
                                            ? Array.from(
                                                new Set(
                                                    currentOrder.items
                                                        .map((item: any) => item?.inventoryName)
                                                        .filter(Boolean)
                                                )
                                            ).join(', ')
                                            : 'N/A'}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-1 text-xs text-default-600 uppercase">
                            <h4>{t("date")}: {currentOrder.orderDate ? new Date(currentOrder.orderDate).toLocaleString() : 'N/A'}</h4>
                            <h4>
                                {t("status")}:{" "}
                                {currentOrder.items?.[0]?.status !== undefined
                                    ? t(`statusOptions.${OrderStatus[currentOrder.items[0].status as OrderStatus]}`)
                                    : "N/A"}
                            </h4>
                        </div>
                    </div>
                </CardHeader>

                <CardContent>
                    <BillSummary
                        defaultItems={currentOrder.items || []}
                        items={currentOrder.items || []}
                        deletedItems={[]}
                    />
                </CardContent>
            </Card>
        </>
    );
};

export default OrderDetails;