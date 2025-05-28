"use client";

import { Button } from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import { useState } from "react";
import {RotateCcw} from "lucide-react";
import {OrderItem} from "@/types/orders";
import ItemsTable from "@/components/ui/ItemsTable";
import BillSummary from "@/app/[locale]/(protected)/dashboard/resign-order/[id]/totaltable";

// Static items data
const staticItems: OrderItem[] = [
  {
    id: 1,
    item: "Headphone",
    tax: "$0.00",
    delivery: "home delivery",
    qty: 2,
    price: 600.25,
    total: 1200.50,
  },
  {
    id: 2,
    item: "Wireless Speaker",
    tax: "$0.00",
    delivery: "home delivery",
    qty: 1,
    price: 150.75,
    total: 150.75,
  },
  {
    id: 3,
    item: "USB Cable",
    tax: "$0.00",
    delivery: "home delivery",
    qty: 3,
    price: 25.00,
    total: 75.00,
  },
  {
    id: 4,
    item: "Phone Case",
    tax: "$0.00",
    delivery: "home delivery",
    qty: 1,
    price: 35.50,
    total: 35.50,
  },
];

const OrderDetails: React.FC = () => {
  const [items, setItems] = useState<OrderItem[]>(staticItems);
  const [deletedItems, setDeletedItems] = useState<number[]>([]);
  const [hasChanges, setHasChanges] = useState<boolean>(false);

  const handleDeleteItem = (itemId: number): void => {
    setDeletedItems((prev: number[]) => [...prev, itemId]);
    setItems((prev: OrderItem[]) => prev.filter((item: OrderItem) => item.id !== itemId));
    setHasChanges(true);
  };

  const handleReset = (): void => {
    setItems(staticItems);
    setDeletedItems([]);
    setHasChanges(false);
  };

  const handleUpdate = (): void => {
    // Here you would typically send the updated data to your API
    console.log('Updated order with items:', items);
    console.log('Deleted items:', deletedItems);
    setHasChanges(false);
    // You can add toast notification here
    alert('Order updated successfully!');
  };

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
                    className="w-[150px] flex-none"
                    onClick={handleReset}
                    disabled={!hasChanges}
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
                <Button
                    size="md"
                    className="w-[150px] flex-none"
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
              <span className="block text-default-900 font-medium leading-5 text-xl">
                Bill to:
              </span>
                <div className="text-default-500 font-normal leading-5 mt-4 text-sm">
                  Annette Black <br />
                  4140 Parker Rd. Allentown, New <br />
                  Mexico 31134
                  <div className="flex space-x-2 mt-2 leading-none rtl:space-x-reverse">
                    <p>Inventory Manager:</p>
                    <span>minaemad</span>
                  </div>
                </div>
              </div>
              <div className="space-y-1">
                <h4 className="text-default-600 font-medium text-xs uppercase">
                  Order Id: 22332285 - 33221144
                </h4>
                <h4 className="text-default-600 font-medium text-xs uppercase">
                  Order Date: July 07, 2023. 09:36 AM
                </h4>
                <h4 className="text-default-600 font-medium text-xs uppercase">
                  Payment Method: Cash On Delivery
                </h4>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <BillSummary defaultItems={staticItems} items={items} deletedItems={deletedItems} />
            <div className="col-span-12 flex justify-end mt-10">
              <Button
                  variant="soft"
                  color="default"
                  size="md"
                  className="cursor-pointer"
              >
                Print
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
  );
};

export default OrderDetails;