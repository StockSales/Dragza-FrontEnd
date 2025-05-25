"use client";

import React, {useEffect, useState} from 'react';
import useGettingProductById from "@/services/products/gettingProductById";
import {useRouter} from "@/i18n/routing";
import {useParams} from "next/navigation";
import useCreateProductPrice from "@/services/productPrice/createProductPrice";
import {toast} from "sonner";
import {Loader2} from "lucide-react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

function AddProductPrice() {
    // getting all products
    const {loading: gettingAllProductsLoading, getProductById, product} = useGettingProductById()
    const router = useRouter();

    const params = useParams();
    const productId = params?.id as string;

    // states for product
    const [purchasePrice, setPurchasePrice] = useState<number>(0)
    const [salesPrice, setSalesPrice] = useState<number>(0)
    const [stock, setStock] = useState<number>(0)
    const [categoryId, setCategoryId] = useState<string>(product?.category?.name as string)

    // Creating new Product price
    const { error: productPriceError, loading: productPriceLoading, createProductPrice} = useCreateProductPrice()


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

        try {
            const success = await createProductPrice({
                categoryId,
                productId,
                purchasePrice,
                salesPrice,
            });

            if (success) {
                toast.success("Product price Created", {
                    description: "Product price added successfully",
                    duration: 1500, // customize duration if needed
                });

                // Redirect after delay
                setTimeout(() => {
                    router.push("/dashboard/product-list");
                }, 1500); // Wait for toast to appear
            }
        } catch (error: any) {
            toast.error("Network Error", {
                description: error,
            });
        }
    };


    // mounted data
    useEffect(() => {
        getProductById(productId)
        console.log("product", product, categoryId)
    }, [categoryId]);

    useEffect(() => {
        if (product?.category?.id) {
            setCategoryId(product?.category?.id as string);
        }
    }, [product]);

    if ( gettingAllProductsLoading == true ) {
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
                                Sales Price
                            </Label>
                            <Input
                                id="salesPrice"
                                type="number"
                                placeholder="sales price"
                                value={salesPrice}
                                onChange={(e) => setSalesPrice(parseInt(e?.target?.value))}
                            />
                        </div>

                        <div className="flex items-center flex-wrap">
                            <Label className="w-[150px] flex-none" htmlFor="stock">
                                Stock
                            </Label>
                            <Input
                                id="stock"
                                type="number"
                                placeholder="eg. 100"
                                value={stock}
                                onChange={(e) => setStock(parseInt(e?.target?.value))}
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
}

export default AddProductPrice;