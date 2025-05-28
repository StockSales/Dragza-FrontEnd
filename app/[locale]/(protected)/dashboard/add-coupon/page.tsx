"use client";

import { useState } from "react";
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
import { useRouter } from "@/i18n/routing";

// Dummy createCoupon service (replace with your real service)
const useCreateCoupon = () => {
  const [loading, setLoading] = useState(false);

  const createCoupon = async (couponData: any) => {
    setLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        setLoading(false);
        resolve(true);
      }, 1000);
    });
  };

  return { createCoupon, loading };
};

const AddCoupon = () => {
  const router = useRouter();
  const { createCoupon, loading } = useCreateCoupon();

  // States for coupon form
  const [code, setCode] = useState("");
  const [type, setType] = useState(""); // "value" or "percentage"
  const [numberOfUsers, setNumberOfUsers] = useState("");
  const [value, setValue] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [minCost, setMinCost] = useState("");
  const [description, setDescription] = useState("");

  const onSubmit = async () => {
    // Simple validation
    if (!code.trim() || !type || !value || !startDate || !endDate) {
      toast.error("Validation Error", { description: "Please fill all required fields." });
      return;
    }
    if (Number(value) <= 0) {
      toast.error("Validation Error", { description: "Value must be greater than 0." });
      return;
    }
    // need to make sure that start date is less than end date
    if (new Date(startDate) >= new Date(endDate)) {
      toast.error("Validation Error", { description: "Start date must be less than end date." });
      return;
    }
    const success = true

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
      const success = await createCoupon(payload);
      if (success) {
        toast.success("Coupon Created", { description: "Coupon has been added successfully." });
        setTimeout(() => {
          router.push("/dashboard/coupons");
        }, 1000);
      }
    } catch (err) {
      toast.error("Failed", { description: "Something went wrong." });
    }
  };

  return (
      <div className="grid grid-cols-12 gap-4 rounded-lg">
        <div className="col-span-12 space-y-4">
          <Card>
            <CardHeader className="border-b border-default-200 mb-6">
              <CardTitle>Coupon Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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
                <Select onValueChange={(e) => setType(e)}>
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
            </CardContent>
          </Card>
        </div>

        <div className="col-span-12 flex justify-end">
          <Button
              className={`cursor-pointer ${loading ? "cursor-not-allowed" : ""}`}
              onClick={onSubmit}
          >
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Save Coupon"}
          </Button>
        </div>
      </div>
  );
};

export default AddCoupon;