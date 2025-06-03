"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RotateCcw } from "lucide-react";
import ItemsTable from "@/components/ui/ItemsTable";
import BillSummary from "./BillSummary"; // adjust path if needed
import {OrderItem, Orders} from "@/types/orders";
import useGettingOrderById from "@/services/Orders/gettingOrderById";
import AxiosInstance from "@/lib/AxiosInstance";
import {ProductType} from "@/types/product";

const OrderDetails: React.FC = () => {
  const params = useParams(); // get dynamic route id
  const id = params?.id;
  const { order, loading, error, getOrderById } = useGettingOrderById();

  const [items, setItems] = useState<OrderItem[]>([]);
  const [originalItems, setOriginalItems] = useState<OrderItem[]>([]);
  const [deletedItems, setDeletedItems] = useState<number[]>([]);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (id) getOrderById(id);
  }, [id]);

  useEffect(() => {
    if (order) {
      const mappedItems = order.items.map((item: OrderItem, index) => ({
        id: item.id,
        item: item.item, // change to product name if available
        qty: item.qty,
        price: item.price,
        total: item.total * item.qty,
      }));

      setItems(mappedItems);
      setOriginalItems(mappedItems);
    }
  }, [order]);

  const handleDeleteItem = (itemId: string) => {
    setDeletedItems((prev: any) => [...prev, itemId]);
    setItems((prev) => prev.filter((item) => item.id !== itemId));
    setHasChanges(true);
  };

  const handleReset = () => {
    setItems(originalItems);
    setDeletedItems([]);
    setHasChanges(false);
  };

  const handleUpdate = async () => {
    try {
      // Example: send deleted product IDs to backend
      await AxiosInstance.put(`/api/Orders/${id}/remove-items`, {
        removedProductIds: deletedItems,
      });
      alert("Order updated successfully!");
      setHasChanges(false);
    } catch (error) {
      console.error(error);
      alert("Failed to update order.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-600">{error}</div>;
  if (!order) return null;

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
                  Pharmacy ID: {order.pharmacyUserId}
                  <div className="flex space-x-2 mt-2">
                    <p>Inventory Manager:</p>
                    <span>{order.inventoryUserId}</span>
                  </div>
                </div>
              </div>
              <div className="space-y-1 text-xs text-default-600 uppercase">
                <h4>Order Id: {order.id}</h4>
                <h4>Order Date: {new Date(order.orderDate).toLocaleString()}</h4>
                <h4>Payment Method: Cash On Delivery</h4>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <BillSummary defaultItems={originalItems} items={items} deletedItems={deletedItems} />
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

export default OrderDetails;