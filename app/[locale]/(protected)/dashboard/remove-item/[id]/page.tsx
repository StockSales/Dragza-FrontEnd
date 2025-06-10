"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RotateCcw, Loader2 } from "lucide-react";
import ItemsTable from "@/components/ui/ItemsTable";
import BillSummary from "./BillSummary";
import { OrderItem } from "@/types/orders";
import useGettingOrderById from "@/services/Orders/gettingOrderById";
import AxiosInstance from "@/lib/AxiosInstance";
import { OrderStatus } from "@/enum";
import useRemoveItemsFromOrder from "@/services/Orders/removeItemsFromOrder";
import {useRouter} from "@/i18n/routing";
import {toast} from "sonner";

const RemoveItems: React.FC = () => {
  const { loading: removeLoading, error: removeError, removeItemsFromOrder } = useRemoveItemsFromOrder()

  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const { order, loading, error, getOrderById } = useGettingOrderById();

  const [items, setItems] = useState<OrderItem[]>([]);
  const [originalItems, setOriginalItems] = useState<OrderItem[]>([]);
  const [deletedItems, setDeletedItems] = useState<string[]>([]);
  const [hasChanges, setHasChanges] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    if (id) {
      getOrderById(id).finally(() => setIsInitialLoad(false));
    }
  }, [id]);

  useEffect(() => {
    if (order) {
      // Safely transform the order items with fallback values
      const mappedItems = order.items.map((item) => ({
        id: item.productId,
        item: `Product ${item.productId}`, // Default name if not available
        quantity: item.quantity || 0,
        unitPrice: item.unitPrice || 0,
        total: (item.unitPrice || 0) * (item.quantity || 0),
        productId: item.productId,
        productPriceId: item.productPriceId,
      }));

      setItems(mappedItems);
      setOriginalItems(mappedItems);
    }
  }, [order]);

  const handleDeleteItem = (itemId: string) => {
    setDeletedItems((prev) => [...prev, itemId]);
    setItems((prev) => prev.filter((item) => item.productId !== itemId));
    setHasChanges(true);
  };

  const handleReset = () => {
    setItems(originalItems);
    setDeletedItems([]);
    setHasChanges(false);
  };

  const handleUpdate = async () => {
    const {success, error} = await removeItemsFromOrder({
      orderId: id,
      itemId: deletedItems,
    })
    if (success) {
      toast.success("Order updated successfully");
        setHasChanges(false);
      setTimeout(() => {
        router.push("/dashboard/order-list");
      }, 2000);
    } else {
        toast.error(`Failed to update order: ${error}`);
        setTimeout(() => {
          toast.dismiss();
        }, 2000);
    }
  };

  if (isInitialLoad) {
    return (
        <div className="flex items-center justify-center h-screen">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
    );
  }

  if (error) return <div className="text-red-600 text-center py-8">{error}</div>;
  if (!order) return <div className="text-center py-8">Order not found</div>;

  return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Order Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border border-solid border-default-400 rounded-md overflow-hidden">
                <ItemsTable
                    items={items}
                    deletedItems={deletedItems}
                    onDeleteItem={handleDeleteItem}
                />
              </div>

              <div className="flex items-center justify-center flex-wrap gap-4">
                <Button
                    size="md"
                    variant="outline"
                    className="w-[150px]"
                    onClick={handleReset}
                    disabled={!hasChanges}
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
                <Button
                    size="md"
                    className="w-[150px]"
                    onClick={handleUpdate}
                    disabled={!hasChanges}
                >
                  Update
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="border-0">
            <div className="flex justify-between flex-wrap gap-4 items-center">
              <div>
                <span className="block text-default-900 font-medium text-xl">Bill to:</span>
                <div className="text-default-500 font-normal mt-4 text-sm">
                  Pharmacy ID: {order.pharmacyUserId || 'N/A'}
                  <div className="flex space-x-2 mt-2">
                    <p>Inventory Manager:</p>
                    <span>{order.inventoryUserId || 'N/A'}</span>
                  </div>
                </div>
              </div>
              <div className="space-y-1 text-xs text-default-600 uppercase">
                <h4>Order Id: {order.id || 'N/A'}</h4>
                <h4>Order Date: {order.orderDate ? new Date(order.orderDate).toLocaleString() : 'N/A'}</h4>
                <h4>Status: {order.status !== undefined ? OrderStatus[order.status] : 'N/A'}</h4>
                <h4>Payment Method: Cash On Delivery</h4>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <BillSummary
                defaultItems={order.items}
                items={items}
                deletedItems={deletedItems}
            />
            <div className="col-span-12 flex justify-end mt-10">
              <Button variant="soft" size="md" className="cursor-pointer">
                Print
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
  );
};

export default RemoveItems;