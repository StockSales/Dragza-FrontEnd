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
import useCreateProductPrice from "@/services/productPrice/createProductPrice";
import useGettingAllProducts from "@/services/products/gettingAllProducts";
import {ProductType} from "@/types/product";

const AddProduct = () => {
  const router = useRouter();

  // states for product
  const [purchasePrice, setPurchasePrice] = useState<number>(0)
  const [salesPrice, setSalesPrice] = useState<number>(0)
  const [categoryId, setCategoryId] = useState<string>("")
  const [productId, setProductId] = useState<string>("")

  // getting all categories
  const {loading: gettingAllCatLoading, data, gettingAllCategories} = GetCategories()

  // Creating new Product price
  const { error: productPriceError, loading: productPriceLoading, createProductPrice, isCreated} = useCreateProductPrice()

  // getting all products
  const {loading: gettingAllProductsLoading, products, getAllProducts} = useGettingAllProducts()

  // on submit
  const onSubmit = async () => {
    if (!purchasePrice) {
      toast.error("Validation Error", { description: "Purchase Price is required." });
      return;
    }
    if (!salesPrice) {
      toast.error("Validation Error", { description: "Sales Price is required." });
      return;
    }
    if (!productId.trim()) {
      toast.error("Validation Error", { description: "Product is required." });
      return;
    }
    if (!categoryId?.trim()) {
      toast.error("Validation Error", {
        description: "Category is required."
      })
      return;
    }

    try {
      const success = await createProductPrice({
        categoryId,
        productId,
        purchasePrice,
        salesPrice,
      })

      if (isCreated) {
        toast.success("Product price Created", {
          description: "Product price added successfully"
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
    getAllProducts("false")
  }, []);

  if (gettingAllCatLoading == true || gettingAllProductsLoading == true) {
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
              <Label className="w-[131px] md:w-[150px] flex-none">Product </Label>
              <Select onValueChange={(value) => setProductId(value)}>
                <SelectTrigger className="flex-1 cursor-pointer">
                  <SelectValue placeholder="Select Product" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Product</SelectLabel>
                    {products.map((item: any) => (
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
              <Label className="w-[150px] flex-none" htmlFor="purchasePrice">
                Purchase Price
              </Label>
              <Input
                id="purchasePrice"
                type="number"
                placeholder="purchase price"
                value={purchasePrice}
                onChange={(e) => setPurchasePrice(parseInt(e?.target?.value))}
              />
            </div>

            <div className="flex items-center flex-wrap">
              <Label className="w-[150px] flex-none" htmlFor="salesPrice">
                Purchase Price
              </Label>
              <Input
                id="salesPrice"
                type="number"
                placeholder="sales price"
                value={salesPrice}
                onChange={(e) => setSalesPrice(parseInt(e?.target?.value))}
              />
            </div>

          </CardContent>
        </Card>
      </div>
      <div className="col-span-12 flex justify-end">
        <Button
            className={`cursor-pointer ${productPriceLoading === true ? "cursor-not-allowed" : ""}`}
            onClick={() => onSubmit()}
        >
          {productPriceLoading === true ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : "Save Product price"}
        </Button>
      </div>
    </div>
  );
};

export default AddProduct;
