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
import {toast} from "sonner";
import {useRouter} from "@/i18n/routing";
import {OrderStatus, OrderStatusLabel, UserRoleLabel} from "@/enum";
import useGettingOrderById from "@/services/Orders/gettingOrderById";
import useGettingInvoiceByOrderId from "@/services/invoices/order/gettingInvoiceByOrderId";
import {Orders} from "@/types/orders";
import BillSummary from "@/app/[locale]/(protected)/dashboard/remove-item/[id]/BillSummary";
import loading from "@/app/[locale]/(protected)/app/projects/loading";
import {Loader2} from "lucide-react";
import useUpdateOrderStatus from "@/services/Orders/updateOrderStatus";

const OrderDetails = () => {
  // state for the order data
  const params = useParams();
  const router = useRouter();

  const id: string | string[] | undefined = params?.id;
  const [order, setOrder] = useState<Orders | null>(null);

  // getting order details
  const {order: orderData, getOrderById, error, loading: orderLoading} = useGettingOrderById()

  // getting Order Invoice By id
  const {loading: invoiceLoading, error: invoiceError, invoice, getInvoiceByOrderId} = useGettingInvoiceByOrderId()

  // updating order status
  const {loading: updateLoading, updateOrderStatus} = useUpdateOrderStatus()



  useEffect(() => {
    if (id) {
      getOrderById(id as string);
      getInvoiceByOrderId(id as string);
    }
  }, []);

  useEffect(() => {
    if (orderData) {
      setOrder(orderData);
    }
  }, [orderData]);

  if (orderLoading || invoiceLoading) {
    return (
        <div className="flex items-center justify-center h-full">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
    );
  }
  return (
      <Card>
        <CardHeader>
          <CardTitle>Order Update</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center flex-wrap gap-4">
              <Label className="w-[150px] flex-none">Order Status: </Label>
              <Select
                  value={order?.status?.toString()}
                  onValueChange={(value: string) => {
                    const numericValue = Number(value) as OrderStatus;
                    setOrder({ ...orderData, status: numericValue });
                  }}
              >
                <SelectTrigger className="flex-1 cursor-pointer">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    {Object.values(OrderStatus)
                        .filter((value) => typeof value === "number")
                        .map((status) => (
                            <SelectItem key={status} value={status.toString()}
                                        disabled={status === OrderStatus.Pending}
                            >

                              {OrderStatusLabel[status as OrderStatus]}
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
                  disabled={updateLoading || order?.status === OrderStatus.Pending}
                  onClick={async () => {
                    if (!id || !order?.status || order.status === OrderStatus.Pending) {
                      toast.warning("Invalid status selected.");
                      return;
                    }

                    const result = await updateOrderStatus(id, order.status);

                    if (result.success) {
                      toast.success("Order status updated successfully!");
                      getOrderById(id as string); // Refresh data
                    } else {
                      toast.error(`Update failed: ${result.error}`);
                    }
                  }}
              >
                {updateLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Update"}
              </Button>
            </div>
          </div>
        </CardContent>
        <Card>
          <CardHeader className="border-0">
            <div className="flex justify-between flex-wrap gap-4 items-center">
              <div>
                <span className="block text-default-900 font-medium text-xl">Bill to:</span>
                <div className="text-default-500 font-normal mt-4 text-sm">
                  Pharmacy ID: {orderData.pharmacyUserId || 'N/A'}
                  <div className="flex space-x-2 mt-2">
                    <p>Inventory Manager:</p>
                    <span>{orderData.inventoryUserId || 'N/A'}</span>
                  </div>
                </div>
              </div>
              <div className="space-y-1 text-xs text-default-600 uppercase">
                <h4>Order Id: {orderData.id || 'N/A'}</h4>
                <h4>Order Date: {orderData.orderDate ? new Date(orderData.orderDate).toLocaleString() : 'N/A'}</h4>
                <h4>Status: {orderData.status !== undefined ? OrderStatus[orderData.status] : 'N/A'}</h4>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <BillSummary
                defaultItems={orderData.items}
                items={orderData.items}
                deletedItems={[]}
            />
            <div className="col-span-12 flex justify-end mt-10">
              <Button variant="soft" size="md" className="cursor-pointer">
                Print
              </Button>
            </div>
          </CardContent>
        </Card>
      </Card>
  );
};

export default OrderDetails;