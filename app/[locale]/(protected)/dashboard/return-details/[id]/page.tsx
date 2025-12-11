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
import { Icon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, useCallback, useMemo } from "react";
import { toast } from "sonner";
import GettingReturnById from "@/services/returns/gettingReturnById";
import useUpdateReturnStatus from "@/services/returns/updateReturnStatus";
import Cookies from "js-cookie";

// Define TypeScript interfaces
interface ReturnItem {
  productId: string;
  productPriceId: string;
  quantityReturned: number;
  reason?: {
    reason: string;
  };
  otherReason?: string;
}

interface ProductPrice {
  id: string;
  salesPrice: number;
  product?: {
    name: string;
  };
  returnedItems?: ReturnItem[];
}

interface ReturnData {
  id: string;
  status: number | string;
  requestDate: string;
  pharmacyName?: string;
  pharmacyUser?: {
    bussinesName: string;
  };
  inventoryUser?: {
    returnedItems?: ReturnItem[];
    productPrices?: ProductPrice[];
  };
  returnOrderInventoryUsers?: Array<{
    returnedItems: ReturnItem[];
  }>;
  items?: Array<{
    productId: string;
    productPriceId: string;
    quantityReturned: number;
  }>;
}

const ReturnDetails = () => {
  const [returnData, setReturnData] = useState<ReturnData | undefined>(undefined);
  const [selectedStatus, setSelectedStatus] = useState<string>("requested");
  const [userType, setUserType] = useState<string | undefined>(undefined);

  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const { loading: updating, updateReturnStatus } = useUpdateReturnStatus();
  const { returnData: fetchedData, loading: fetching, error, getReturnById } = GettingReturnById();

  const id = useMemo(() => {
    const idFromParams = params?.id;
    const idFromQuery = searchParams?.get("id");

    if (Array.isArray(idFromParams)) {
      return idFromParams[0] || idFromQuery || "";
    }

    return idFromParams || idFromQuery || "";
  }, [params, searchParams]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const role = Cookies.get("userRole");
      setUserType(role || undefined);
    }
  }, []);

  useEffect(() => {
    if (id) {
      getReturnById(id);
    }
  }, [id, getReturnById]);

  useEffect(() => {
    if (fetchedData) {
      const statusMap: Record<number, string> = {
        0: "requested",
        1: "completed"
      };

      let statusValue = "requested";
      if (typeof fetchedData.status === "number") {
        statusValue = statusMap[fetchedData.status] || "requested";
      } else if (typeof fetchedData.status === "string") {
        statusValue = fetchedData.status;
      }

      setReturnData({
        ...fetchedData,
        status: statusValue
      });
      setSelectedStatus(statusValue);
    }
  }, [fetchedData]);

  useEffect(() => {
    if (error) {
      toast.error("Error", { description: error });
    }
  }, [error]);

  const getReasonForProduct = useCallback((productId: string) => {
    if (!returnData) return "N/A";

    const inventoryReturnedItem = returnData.inventoryUser?.returnedItems?.find(
      (item) => item.productId === productId
    );
    if (inventoryReturnedItem?.reason?.reason) return inventoryReturnedItem.reason.reason;
    if (inventoryReturnedItem?.otherReason) return inventoryReturnedItem.otherReason;

    const returnOrderItem = returnData.returnOrderInventoryUsers?.[0]?.returnedItems?.find(
      (item) => item.productId === productId
    );
    if (returnOrderItem?.reason?.reason) return returnOrderItem.reason.reason;
    if (returnOrderItem?.otherReason) return returnOrderItem.otherReason;

    const productPriceReturnItem = returnData.inventoryUser?.productPrices?.flatMap(
      (price) => price.returnedItems || []
    ).find((item) => item.productId === productId);

    if (productPriceReturnItem?.reason?.reason) return productPriceReturnItem.reason.reason;
    if (productPriceReturnItem?.otherReason) return productPriceReturnItem.otherReason;

    return "N/A";
  }, [returnData]);

  const handleUpdateReturnStatus = async () => {
    if (!id) {
      toast.error("Error", { description: "Return ID is missing" });
      return;
    }

    try {
      const statusMap: Record<string, number> = {
        requested: 0,
        completed: 1
      };
      const statusValue = statusMap[selectedStatus] ?? 0;
      const updatedData = { status: statusValue };

      const result = await updateReturnStatus(id, updatedData);

      if (result.success) {
        toast.success("Return Updated", {
          description: "Return Status Updated Successfully"
        });

        setReturnData(prev => prev ? { ...prev, status: selectedStatus } : undefined);

        getReturnById(id);

        setTimeout(() => {
          router.push("/dashboard/return-list");
        }, 1200);
      } else {
        toast.error("Failed", {
          description: result.error || "Update Failed"
        });
      }
    } catch (err: any) {
      toast.error("Failed", {
        description: err?.response?.data || "An unexpected error occurred"
      });
    }
  };

  const isLoading = fetching || updating;
  const currentStatus = returnData?.status || "requested";
  const hasStatusChanged = selectedStatus !== currentStatus;
  const isInventoryUser = userType === "Inventory";

  const pharmacyName = useMemo(() => {
    return returnData?.pharmacyName ||
      returnData?.pharmacyUser?.bussinesName ||
      "N/A";
  }, [returnData]);

  const calculateTotalAmount = useCallback((productPriceId: string, quantity: number) => {
    if (!returnData?.inventoryUser?.productPrices) return "N/A";

    const productPrice = returnData.inventoryUser.productPrices.find(
      (pp) => pp.id === productPriceId
    );

    if (!productPrice?.salesPrice || !quantity) return "N/A";

    return (productPrice.salesPrice * quantity).toFixed(2);
  }, [returnData]);

  if (fetching) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-10">
          <div className="text-center">
            <Icon
              icon="svg-spinners:ring-resize"
              className="h-8 w-8 mx-auto mb-2"
            />
            <p>Loading return details...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {isInventoryUser && (
        <Card>
          <CardHeader>
            <CardTitle>Update Return Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center flex-wrap gap-4">
                <Label className="w-[150px] flex-none">Return Status: </Label>
                <Select
                  value={selectedStatus}
                  onValueChange={setSelectedStatus}
                  disabled={isLoading || returnData?.status === "completed"}
                >
                  <SelectTrigger className="flex-1 cursor-pointer min-w-[200px]">
                    <SelectValue placeholder="Select status">
                      <div className="flex items-center gap-2">
                        {selectedStatus === "requested" ? (
                          <>
                            <Icon
                              icon="heroicons:clock"
                              className="h-4 w-4 text-yellow-600"
                            />
                            <span>Requested</span>
                          </>
                        ) : (
                          <>
                            <Icon
                              icon="heroicons:check-circle"
                              className="h-4 w-4 text-emerald-600"
                            />
                            <span>Completed</span>
                          </>
                        )}
                      </div>
                    </SelectValue>
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Status</SelectLabel>
                      <SelectItem value="requested">
                        <div className="flex items-center gap-2">
                          <Icon
                            icon="heroicons:clock"
                            className="h-4 w-4 text-yellow-600"
                          />
                          <span>Requested</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="completed">
                        <div className="flex items-center gap-2">
                          <Icon
                            icon="heroicons:check-circle"
                            className="h-4 w-4 text-emerald-600"
                          />
                          <span>Completed</span>
                        </div>
                      </SelectItem>
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
                    isLoading ||
                    !hasStatusChanged ||
                    returnData?.status === "completed"
                  }
                  onClick={handleUpdateReturnStatus}
                >
                  {updating ? (
                    <>
                      <Icon
                        icon="svg-spinners:ring-resize"
                        className="h-4 w-4 mr-2"
                      />
                      Updating...
                    </>
                  ) : (
                    "Update Status"
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader className="border-0">
          <div className="flex justify-between flex-wrap gap-4 items-center">
            <div>
              <span className="block text-default-900 font-medium text-xl">
                Bill to:
              </span>
              <div className="text-default-500 mt-4 text-sm">
                <div className="mb-4">
                  <span className="font-medium">Pharmacy Name:</span>{" "}
                  {pharmacyName}
                </div>

                {returnData?.items && returnData.items.length > 0 ? (
                  <div className="space-y-4">
                    {returnData.items.map((item, index) => {
                      const productPrice = returnData.inventoryUser?.productPrices?.find(
                        (pp) => pp.id === item.productPriceId
                      );
                      const product = productPrice?.product;
                      const reason = getReasonForProduct(item.productId);
                      const totalAmount = calculateTotalAmount(
                        item.productPriceId,
                        item.quantityReturned
                      );

                      return (
                        <div
                          key={`${item.productId}-${index}`}
                          className="mt-4 p-4 border border-gray-200 rounded bg-gray-50"
                        >
                          <div className="mb-2">
                            <span className="font-medium">Product:</span>{" "}
                            {product?.name || "N/A"}
                          </div>
                          <div className="mb-2">
                            <span className="font-medium">Quantity Returned:</span>{" "}
                            {item.quantityReturned || "N/A"}
                          </div>
                          <div className="mb-2">
                            <span className="font-medium">Price per unit:</span>{" "}
                            ${productPrice?.salesPrice?.toFixed(2) || "N/A"}
                          </div>
                          <div className="mb-2">
                            <span className="font-medium">Total Amount:</span>{" "}
                            ${totalAmount}
                          </div>
                          <div>
                            <span className="font-medium">Reason:</span> {reason}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-4 text-gray-500">
                    No items found
                  </div>
                )}
              </div>

              <div className="mt-6">
                <h4 className="text-default-600 text-xs uppercase mb-2">
                  Return Id: {returnData?.id || "N/A"}
                </h4>
                <h4 className="text-default-600 text-xs uppercase">
                  Return Date: {returnData?.requestDate || "N/A"}
                </h4>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
};

export default ReturnDetails;