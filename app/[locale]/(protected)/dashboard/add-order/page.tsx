"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useRouter } from "@/i18n/routing";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {ChevronDown} from "lucide-react";

const options = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Orange", value: "orange" },
];

const AddOrder = () => {
  const router = useRouter();

  const [products, setProducts] = useState<string[]>([]);
  const [pref, setPref] = useState("");
  const [description, setDescription] = useState("");

  const [open, setOpen] = useState(false);

  const toggleValue = (value: string) => {
    setProducts((current) =>
        current.includes(value)
            ? current.filter((v) => v !== value)
            : [...current, value]
    );
  };


  const addOrder = () => {
    if (products.length !== 0) {
      toast.error("Validation Error", { description: "Product is required." });
      return;
    }
    if (!pref.trim()) {
      toast.error("Validation Error", { description: "Product price is required." });
      return;
    }
    if (!description.trim()) {
      toast.error("Validation Error", { description: "Description is required." });
      return;
    }

    toast.success("Order Added", {
      description: "Order Added Successfully"
    });

    setTimeout(() => {
      router.push('/dashboard/order-list');
    }, 2000);
  };

  return (
      <div className="grid grid-cols-12 gap-4 rounded-lg">
        <div className="col-span-12">
          <Card>
            <CardHeader className="border-b border-solid border-default-200 mb-6">
              <CardTitle>Order Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center flex-wrap">
                <Label className="w-[150px] flex-none" htmlFor="products">
                  Products
                </Label>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <button
                        className="flex-1 w-full flex justify-between items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm cursor-pointer"
                        onClick={() => setOpen(!open)}
                    >
                      {products.length === 0 ? "Select fruits" : products.join(", ")}
                      <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </button>
                  </PopoverTrigger>

                  <PopoverContent className="w-80 p-2 bg-white border rounded-md shadow-md">
                    {options.map((option) => (
                        <label key={option.value} className="flex items-center gap-2 py-2 cursor-pointer">
                          <input
                              type="checkbox"
                              checked={products.includes(option.value)}
                              onChange={() => toggleValue(option.value)}
                          />
                          <span>{option.label}</span>
                        </label>
                    ))}
                    <button
                        className="mt-2 w-full bg-blue-500 text-white py-1 rounded cursor-pointer"
                        onClick={() => setOpen(false)}
                    >
                      Done
                    </button>
                  </PopoverContent>
                </Popover>
              </div>
            </CardContent>
            <CardContent className="space-y-4">
              <div className="flex items-center flex-wrap">
                <Label className="w-[150px] flex-none" htmlFor="categoryPref">
                  Pref
                </Label>
                <Input
                    id="categoryPref"
                    type="text"
                    placeholder="Pref"
                    value={pref}
                    onChange={(e) => setPref(e.target.value)}
                />
              </div>
            </CardContent>
            <CardContent className="space-y-4">
              <div className="flex items-center flex-wrap">
                <Label className="w-[150px] flex-none" htmlFor="categoryDescription">
                  Description
                </Label>
                <Textarea
                    id="categoryDescription"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="col-span-12 flex justify-center">
          <Button onClick={addOrder}>Add Order</Button>
        </div>
      </div>
  );
};

export default AddOrder;