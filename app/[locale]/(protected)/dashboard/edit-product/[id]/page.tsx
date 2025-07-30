"use client";

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
import {useParams} from "next/navigation";
import useGettingProductById from "@/services/products/gettingProductById";
import {useEffect, useState} from "react";
import {toast} from "sonner";
import {useRouter} from "@/i18n/routing";
import {Loader2} from "lucide-react";
import GetCategories from "@/services/categories/getCategories";
import useGettingAllActiveIngredient from "@/services/ActiveIngerients/gettingAllActiveIngerients";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {formatDateToDMY} from "@/utils";
import {Price} from "@/types/price";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table";
import {productColumns} from "@/app/[locale]/(protected)/dashboard/edit-product/[id]/columns";
import useUpdateProductById from "@/services/products/UpdateProductById";

const EditProduct = () => {
  // router for navigation
  const router = useRouter();

  // update product
  const { loading: updateProductLoading, updatingProductById, error: updateProductError} = useUpdateProductById()

  // states for getting all categories
  const {data: categories, gettingAllCategories, loading: gettingAllCategoriesLoading} = GetCategories()

  // getting all Active Ingredients
  const { loading: gettingAllActiveIngredientsLoading, activeIngredients, gettingAllActiveIngredients } = useGettingAllActiveIngredient()

  // state to manage the loading state
  const [formData, setFormData] = useState({
    name: "",
    arabicName: "",
    pref: "",
    description: "",
    categoryId: "",
    image: null as File | null,
    activeIngredientId: ""
  })

  // getting the id of product from URL
  const params = useParams();
  const productId = params?.id as string;

  // function to get product by id
  const {getProductById, product, loading, error} = useGettingProductById()


  const [activeIngredientSearch, setActiveIngredientSearch] = useState<string>("");

  const filteredActiveIngredients = activeIngredients.filter((active: any) =>
    active.name.toLowerCase().includes(activeIngredientSearch.toLowerCase())
  );

  const table = useReactTable({
    data: product?.prices ?? [],
    columns: productColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  // function to handle the update of product
  const handleUpdateProduct = async (productId: string, formData: any) => {
    if (!formData.name || !formData.pref || !formData.description || !formData.categoryId || !formData.activeIngredientId) {
      toast.error("Please fill all the fields");
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("arabicName", formData.arabicName);
    data.append("preef", formData.pref);
    data.append("description", formData.description);
    data.append("categoryId", formData.categoryId);
    data.append("activeIngredientId", formData.activeIngredientId);
    data.append("image", formData.image);

    try {
     const { success: isUpdated, error} = await updatingProductById(productId, data)
      if (isUpdated) {
        toast.success("Product updated successfully");
        setTimeout(() => {
          router.push('/dashboard/product-list');
        }, 2000);
      } else {
        throw new Error(error);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  // mounted data
  useEffect(() => {
    gettingAllCategories();
    gettingAllActiveIngredients();
  }, []);

  // dependent data
  useEffect(() => {
    if (productId) getProductById(productId)
  }, [productId]);

  // // If product is undefined after loading is done, show error
  //   useEffect(() => {
  //       if (loading == false && !product) {
  //         toast.error("Something went wrong", {
  //             description: "Please, reload the page",
  //         });
  //         setTimeout(() => {
  //           router.push('/dashboard/product-list');
  //         }, 2000);
  //       }
  //   }, [loading, product]);

  useEffect(() => {
    if (product) {
        setFormData({
            name: product.name || "",
            arabicName: product.arabicName || "",
            pref: product.preef || "",
            description: product.description || "",
            categoryId: String(product.category.id) || "" ,
            activeIngredientId: product.activeIngredient.id || "",
            image: product.image || ""
        })
    }
  }, [product]);

  if (loading == true || gettingAllCategoriesLoading == true || gettingAllActiveIngredientsLoading == true) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 size={32} />
      </div>
    );
  }


  return (
    <div className=" grid grid-cols-12  gap-4  rounded-lg">
      <div className="col-span-12 md:col-span-12 space-y-12 lg:col-span-12 ">
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
                  placeholder="Full name"
                  value={formData?.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div className="flex items-center flex-wrap">
              <Label className="w-[150px] flex-none" htmlFor="arabicName">
                Product Arabic Name
              </Label>
              <Input
                  id="arabicName"
                  type="text"
                  placeholder="Arabic name"
                  value={formData?.arabicName}
                  onChange={(e) => setFormData({...formData, arabicName: e.target.value})}
              />
            </div>

            <div className="flex items-center flex-wrap">
              <Label className="w-[150px] flex-none" htmlFor="pref">
                Pref
              </Label>
              <Input
                  id="pref"
                  type="text"
                  placeholder="Pref"
                  value={formData?.pref}
                    onChange={(e) => setFormData({...formData, pref: e.target.value})}
              />
            </div>

            <div className="flex items-center flex-wrap">
              <Label className="w-[150px] flex-none" htmlFor="pref">
                Product Photo
              </Label>
              <Input
                  id="pref"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setFormData({ ...formData, image: file });
                    }
                  }}
              />
            </div>

            <div className="flex items-center flex-wrap gap-4 md:gap-0">
              <Label className="w-[150px] flex-none">Category</Label>
              <Select value={product?.category.id?.toString()} onValueChange={(value) => setFormData({...formData, categoryId: value})}>
                <SelectTrigger className="flex-1 cursor-pointer">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Category</SelectLabel>
                    {categories.map((category: any) => (
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
              <Label className="w-[150px] flex-none">Active Ingredient</Label>
              <Select
                value={formData.activeIngredientId}
                onValueChange={(value) => setFormData({ ...formData, activeIngredientId: value })}
              >
                <SelectTrigger className="flex-1 cursor-pointer">
                  <SelectValue placeholder="Select Active Ingredient" />
                </SelectTrigger>
                <SelectContent onCloseAutoFocus={(e) => e.preventDefault()}>
                  <div className="px-2 py-1" tabIndex={-1}>
                    <Input
                      placeholder="Search Active Ingredient"
                      value={activeIngredientSearch}
                      onChange={(e) => setActiveIngredientSearch(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <SelectGroup>
                    <SelectLabel>Active Ingredient</SelectLabel>
                    {filteredActiveIngredients.length > 0 ? (
                      filteredActiveIngredients.map((active: any) => (
                        <SelectItem key={active.id} value={active.id}>
                          {active.name}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="no-results" disabled>No results found</SelectItem>
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>



              <div className="flex items-center flex-wrap">
              <Label className="w-[150px] flex-none" htmlFor="Description">
                Description
              </Label>
              <Textarea
                  id="Description"
                  placeholder="Description"
                  value={formData?.description}
              />
            </div>
          </CardContent>
        </Card>

        {product?.prices && product?.prices.length > 0 && (
  <Card>
    <CardHeader className="border-b border-solid border-default-200 mb-6">
      <CardTitle>Product Price</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <Accordion type="single" collapsible className="w-full">
        {product.prices.map((item: Price, index: number) => (
          <AccordionItem
            value={`value-${index + 1}`}
            key={`changelog-${index}`}
            className="border-default-100"
          >
            <AccordionTrigger className="cursor-pointer">
              <div>
                {item.inventoryUserName}
                <span className="font-semibold text-xs text-default-400">
                  {" "}– Published on {formatDateToDMY(item.creationDate)}
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              {/* You can show details of this specific price item here */}
              <div className="border border-solid border-default-200 rounded-lg overflow-hidden border-t-0 p-4 space-y-2">
                <p><strong>Purchase Price:</strong> {item.purchasePrice}</p>
                <p><strong>Sales Price:</strong> {item.salesPrice}</p>
                <p><strong>Stock Quantity:</strong> {item.stockQuantity}</p>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </CardContent>
  </Card>
)}

      </div>

      <div className="col-span-12 flex justify-end">
        <Button onClick={() => handleUpdateProduct(productId, formData)}>Update Product</Button>
      </div>
    </div>
  );
};

export default EditProduct;
