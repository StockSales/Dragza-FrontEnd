"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const useUpdateCoupon = () => {
  const [loading, setLoading] = useState(false);

  const updateCoupon = async (couponData: any) => {
    setLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        setLoading(false);
        resolve(true);
      }, 1000);
    });
  };

  return { updateCoupon, loading };
};

const useGetCouponById = (id: string | undefined) => {
  const [coupon, setCoupon] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    setTimeout(() => {
      // Dummy data — replace with real API logic
      setCoupon({
        code: "SUMMER50",
        type: "percentage",
        numberOfUsers: 100,
        value: 50,
        startDate: "2025-06-01",
        endDate: "2025-07-01",
        minCostToActivate: 200,
        description: "Summer Super Sale Coupon",
      });
      setLoading(false);
    }, 800);
  }, [id]);

  return { coupon, loading };
};

const EditCoupon = () => {
  const router = useRouter();
  const params = useParams();
  const couponId = params?.id as string | undefined;
  const isEdit = Boolean(couponId);

  const { coupon, loading: isLoadingCoupon } = useGetCouponById(couponId);
  const { updateCoupon, loading: isSaving } = useUpdateCoupon();

  const [code, setCode] = useState("");
  const [type, setType] = useState("");
  const [numberOfUsers, setNumberOfUsers] = useState("");
  const [value, setValue] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [minCost, setMinCost] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (coupon) {
      setCode(coupon.code || "");
      setType(coupon.type || "");
      setNumberOfUsers(coupon.numberOfUsers?.toString() || "");
      setValue(coupon.value?.toString() || "");
      setStartDate(coupon.startDate || "");
      setEndDate(coupon.endDate || "");
      setMinCost(coupon.minCostToActivate?.toString() || "");
      setDescription(coupon.description || "");
    }
  }, [coupon]);

  const onSubmit = async () => {
    if (!code.trim() || !type || !value || !startDate || !endDate) {
      toast.error("Validation Error", {
        description: "Please fill all required fields.",
      });
      return;
    }

    if (Number(value) <= 0) {
      toast.error("Validation Error", {
        description: "Value must be greater than 0.",
      });
      return;
    }

    if (new Date(startDate) >= new Date(endDate)) {
      toast.error("Validation Error", {
        description: "Start date must be less than end date.",
      });
      return;
    }

    const payload = {
      code,
      type,
      numberOfUsers: Number(numberOfUsers),
      value: Number(value),
      startDate,
      endDate,
      minCostToActivate: Number(minCost),
      description,
    };

    try {
      const success = await updateCoupon({ id: couponId, ...payload });
      if (success) {
        toast.success(isEdit ? "Coupon Updated" : "Coupon Created", {
          description: isEdit
              ? "Coupon has been updated successfully."
              : "Coupon has been added successfully.",
        });
        setTimeout(() => {
          router.push("/dashboard/coupons");
        }, 1000);
      }
    } catch (err) {
      toast.error("Failed", {
        description: "Something went wrong.",
      });
    }
  };

  return (
      <div className="grid grid-cols-12 gap-4 rounded-lg">
        <div className="col-span-12 space-y-4">
          <Card>
            <CardHeader className="border-b border-default-200 mb-6">
              <CardTitle>{isEdit ? "Edit Coupon" : "Add New Coupon"}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {isEdit && isLoadingCoupon ? (
                  <div className="text-muted-foreground">Loading coupon data...</div>
              ) : (
                  <>
                    <div className="flex items-center flex-wrap">
                      <Label className="w-[150px] flex-none">Coupon Code</Label>
                      <Input
                          type="text"
                          placeholder="e.g. SAVE10"
                          value={code}
                          onChange={(e) => setCode(e.target.value)}
                      />
                    </div>

                    <div className="flex items-center flex-wrap gap-4 md:gap-0">
                      <Label className="w-[150px] flex-none">Coupon Type</Label>
                      <Select value={type} onValueChange={(e) => setType(e)}>
                        <SelectTrigger className="flex-1 cursor-pointer">
                          <SelectValue placeholder="Select Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Type</SelectLabel>
                            <SelectItem value="value">Value</SelectItem>
                            <SelectItem value="percentage">Percentage</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center flex-wrap">
                      <Label className="w-[150px] flex-none">Value</Label>
                      <Input
                          type="number"
                          placeholder="e.g. 10 or 20%"
                          value={value}
                          onChange={(e) => setValue(e.target.value)}
                      />
                    </div>

                    <div className="flex items-center flex-wrap">
                      <Label className="w-[150px] flex-none">Number of Users</Label>
                      <Input
                          type="number"
                          placeholder="e.g. 100"
                          value={numberOfUsers}
                          onChange={(e) => setNumberOfUsers(e.target.value)}
                      />
                    </div>

                    <div className="flex items-center flex-wrap">
                      <Label className="w-[150px] flex-none">Start Date</Label>
                      <Input
                          type="date"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                      />
                    </div>

                    <div className="flex items-center flex-wrap">
                      <Label className="w-[150px] flex-none">End Date</Label>
                      <Input
                          type="date"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                      />
                    </div>

                    <div className="flex items-center flex-wrap">
                      <Label className="w-[150px] flex-none">Min Cost to Activate</Label>
                      <Input
                          type="number"
                          placeholder="e.g. 50"
                          value={minCost}
                          onChange={(e) => setMinCost(e.target.value)}
                      />
                    </div>

                    <div className="flex items-center flex-wrap">
                      <Label className="w-[150px] flex-none">Description</Label>
                      <Textarea
                          placeholder="Enter description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                  </>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="col-span-12 flex justify-end">
          <Button
              disabled={isSaving || (isEdit && isLoadingCoupon)}
              onClick={onSubmit}
              className={`cursor-pointer ${isSaving ? "cursor-not-allowed" : ""}`}
          >
            {isSaving ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : isEdit ? (
                "Update Coupon"
            ) : (
                "Save Coupon"
            )}
          </Button>
        </div>
      </div>
  );
};

export default EditCoupon;
