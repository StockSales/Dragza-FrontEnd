"use client";

import {useEffect, useState} from "react";
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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import GetCategories from "@/services/categories/getCategories";
import {Loader2} from "lucide-react";
import useCreateProduct from "@/services/products/createProduct";
import {toast} from "sonner";
import {useRouter} from "@/i18n/routing";
import useGettingAllActiveIngredient from "@/services/ActiveIngerients/gettingAllActiveIngerients";

const AddProduct = () => {
  const router = useRouter();

  // states for product
  const [name, setName] = useState<string>("")
  const [arabicName, setArabicName] = useState<string>("")
  const [preef, setPref] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [categoryId, setCategoryId] = useState<string>("")
  const [photo, setPhoto] = useState<File | null>(null);
  const [activeIngredientId, setActiveIngredient] = useState<string>("")

  // getting all categories
  const {loading: gettingAllCatLoading, data, gettingAllCategories} = GetCategories()

  // getting all active ingredients
  const {activeIngredients, loading: gettingAllActiveIngredientsLoading, error: gettingAllActiveIngredientsError, gettingAllActiveIngredients} = useGettingAllActiveIngredient()

  // Create new Product
  const {createProduct, isCreated, loading: creatingProductLoading, error} = useCreateProduct()

  // on submit
  const onSubmit = async () => {
    if (!name.trim()) {
      toast.error("Validation Error", { description: "Name is required." });
      return;
    }
    if (!arabicName.trim()) {
      toast.error("Validation Error", { description: "Arabic Name is required." });
      return;
    }
    if (!preef.trim()) {
      toast.error("Validation Error", { description: "Pref is required." });
      return;
    }
    if (!description.trim()) {
      toast.error("Validation Error", { description: "Description is required." });
      return;
    }
    if (!categoryId?.trim()) {
      toast.error("Validation Error", {
        description: "Category is required."
      })
      return;
    }
    if (!activeIngredientId?.trim()) {
      toast.error("Validation Error", {
        description: "Active Ingredient is required."
      })
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("arabicName", arabicName);
    formData.append("preef", preef);
    formData.append("description", description);
    formData.append("categoryId", categoryId);
    formData.append("activeIngredientId", activeIngredientId);
    formData.append("image", photo as File);

    try {
      const success = await createProduct(formData)

      if (success) {
        toast.success("Product Created", {
          description: "Product added successfully"
        })
        setTimeout(() => {
          router.push("/dashboard/product-list");
        }, 1000);
      }
    } catch (error: any) {
      toast.error("Network Error", {
        description: error,
      });
    }


  }

  // mounted data
  useEffect(() => {
    gettingAllCategories()
    gettingAllActiveIngredients()
  }, []);

  if (gettingAllCatLoading == true || gettingAllActiveIngredientsLoading == true) {
    return (
        <div className="w-6 h-6 flex items-center justify-center">
          <Loader2 size={12}/>
        </div>
    )
  }

  return (
    <div className=" grid grid-cols-12  gap-4  rounded-lg">
      <div className="col-span-12 space-y-4 ">
        <Card>
          <CardHeader className="border-b border-solid border-default-200 mb-6">
            <CardTitle>Product Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center flex-wrap">
              <Label className="w-[150px] flex-none" htmlFor="h_Fullname">
                Product Name
              </Label>
              <Input
                id="h_Fullname"
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e?.target?.value)}
              />
            </div>

            <div className="flex items-center flex-wrap">
              <Label className="w-[150px] flex-none" htmlFor="arabicName">
                Product Arabic Name
              </Label>
              <Input
                id="arabicName"
                type="text"
                placeholder="Arabic Name"
                value={arabicName}
                onChange={(e) => setArabicName(e?.target?.value)}
              />
            </div>

            <div className="flex items-center flex-wrap">
              <Label className="w-[150px] flex-none" htmlFor="pref">
                Company
              </Label>
              <Input
                  id="pref"
                  type="text"
                  placeholder="Company"
                  value={preef}
                  onChange={(e) => setPref(e?.target?.value)}
              />
            </div>
            <div className="flex items-center flex-wrap">
              <Label className="w-[150px] flex-none" htmlFor="pref">
                Product Photo
              </Label>
              <Input
                  id="photo"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setPhoto(file);
                    }
                  }}
              />
            </div>

            <div className="flex items-center flex-wrap gap-4 md:gap-0">
              <Label className="w-[131px] md:w-[150px] flex-none">Category</Label>
              <Select onValueChange={(e) => setCategoryId(e)}>
                <SelectTrigger className="flex-1 cursor-pointer">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Category</SelectLabel>
                    {data.map((category: any) => (
                        <SelectItem
                            key={category.id}
                            value={category.id}
                        >
                          {category.name}
                        </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center flex-wrap gap-4 md:gap-0">
              <Label className="w-[131px] md:w-[150px] flex-none">Active Ingredient</Label>
              <Select onValueChange={(value) => setActiveIngredient(value)}>
                <SelectTrigger className="flex-1 cursor-pointer">
                  <SelectValue placeholder="Select Active Ingredient" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Active Ingredient</SelectLabel>
                    {activeIngredients.map((item: any) => (
                        <SelectItem
                            key={item.id}
                            value={item.id}
                        >
                          {item.name}
                        </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center flex-wrap">
              <Label className="w-[150px] flex-none" htmlFor="desc">
                Description
              </Label>
              <Textarea
                  id="desc"
                  placeholder="description"
                  value={description}
                  onChange={(e) => setDescription(e?.target?.value)}
              />
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="col-span-12 flex justify-end">
        <Button
            className={`cursor-pointer ${creatingProductLoading === true ? "cursor-not-allowed" : ""}`}
            onClick={() => onSubmit()}
        >
          {creatingProductLoading === true ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : "Save Product"}
        </Button>
      </div>
    </div>
  );
};

export default AddProduct;
