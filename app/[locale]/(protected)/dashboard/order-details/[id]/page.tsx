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

const OrderDetails = () => {
  // state for the order data
  const [order, setOrder] = useState<OrderData | undefined>(undefined);
  const params = useParams();
  const router = useRouter();

  const id: string | string[] | undefined = params?.id;


  // getting the order details
  // const getOrder = (id: string | string[] | undefined) => {
  //   const foundOrder = data.find((item) => item.id == id);
  //   setOrder(foundOrder);
  // }

  // handling update the order status
  const updateOrderStatus = (id: string | string[] | undefined) => {
    toast.success("Order Updated", {
      description: "Order Updated Successfully"
    })
    setTimeout(() => {
      router.push("/dashboard/order-list");
    }, 2000);
  }


  // // dependant data
  // useEffect(() => {
  //   if (id) {
  //     getOrder(id);
  //   }
  // }, [id]);


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
                  value={order?.order_status}
                  onValueChange={(value: "approve" | "prepare" | "reject" | "ship" | "deliver" | "complete") => {
                    if (order) {
                      setOrder({ ...order, order_status: value });
                    }
                  }}
              >
                <SelectTrigger className="flex-1 cursor-pointer">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    <SelectItem value="approve">Approve</SelectItem>
                    <SelectItem value="prepare">Prepare</SelectItem>
                    <SelectItem value="ship">Ship</SelectItem>
                    <SelectItem value="reject">Reject</SelectItem>
                    <SelectItem value="deliver">Deliver</SelectItem>
                    <SelectItem value="complete">Complete</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-center flex-wrap gap-4">
              <Button
                  size="md"
                  variant="outline"
                  className="w-[150px] flex-none"
                  type="submit"
                  onClick={() => updateOrderStatus(id)}
              >
                Update
              </Button>
            </div>
          </div>
        </CardContent>
        <CardHeader className="border-0">
          <div className="flex justify-between flex-wrap gap-4 items-center">
            <div>
            <span className="block text-default-900 font-medium leading-5 text-xl">
              Bill to:
            </span>

              <div className="text-default-500 font-normal leading-5 mt-4 text-sm">
                Annette black-500 <br />
                4140 Parker Rd. Allentown, New <br />
                Mexico 31134
                <div className="flex space-x-2 mt-2 leading-none rtl:space-x-reverse">
                  <Icon icon="heroicons-outline:phone" />
                  <span>(252) 555-0126,(201) 555-0124</span>
                </div>
                <div className="mt-[6px] flex space-x-2 leading-none rtl:space-x-reverse">
                  <Icon icon="heroicons-outline:mail" />
                  <span>Dashcode@example.com</span>
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
          <div className="border border-solid border-default-400 rounded-md overflow-hidden">
            <TotalTable />
          </div>
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
  );
};

export default OrderDetails;