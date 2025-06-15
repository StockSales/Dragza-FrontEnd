"use client";

import {useEffect, useState} from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useRouter } from "@/i18n/routing";
import useCreateCategory from "@/services/categories/CreateCategory";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import useGettingAllMainCategories from "@/services/MainCategories/gettingAllMainCategories";
import {Loader2} from "lucide-react";

const AddCategory = () => {
  const { creatingCategory, loading } = useCreateCategory()
  const router = useRouter();

  // getting all main Categories
  const {loading: mainCategoriesLoading, mainCategories, getAllMainCategories, error: mainCategoriesError} = useGettingAllMainCategories()

  const [name, setName] = useState("");
  const [pref, setPref] = useState("");
  const [description, setDescription] = useState("");
  const [module, setModule] = useState("");

  const addCategory = async () => {
    if (!name.trim()) {
      toast.error("Validation Error", { description: "Category Name is required." });
      return;
    }
    if (!pref.trim()) {
      toast.error("Validation Error", { description: "Pref is required." });
      return;
    }
    if (!description.trim()) {
      toast.error("Validation Error", { description: "Description is required." });
      return;
    }

    try {
      const success = await creatingCategory({ name,mainCategoryId: module , pref, description });
      if (success) {
        toast.success("Category Added", {
          description: "Category added successfully!",
        });
        setTimeout(() => {
          router.push("/dashboard/categories");
        }, 1000);
      }
    } catch (error: any) {
      toast.error("Network Error", {
        description: error,
      });
    }
  };

  useEffect(() => {
    getAllMainCategories()
  }, []);

  if(mainCategoriesLoading) {
    return (
        <div className="flex items-center justify-center h-screen">
          <Loader2 className="animate-spin h-6 w-6 text-gray-500" />
        </div>
    );
  }

  return (
      <div className="grid grid-cols-12 gap-4 rounded-lg">
        <div className="col-span-12">
          <Card>
            <CardHeader className="border-b border-solid border-default-200 mb-6">
              <CardTitle>Category Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center">
                <Label className="w-[150px] flex-none" htmlFor="module">
                  Module Name
                </Label>
                <Select onValueChange={(value) => setModule(value)}>
                  <SelectTrigger id="module" className="felx-1">
                    <SelectValue placeholder="Select Module" />
                  </SelectTrigger>
                  <SelectContent>
                    {mainCategories.map((module) => (
                        <SelectItem key={module.id} value={module.id}>
                          {module.name}
                        </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardContent className="space-y-4">
              <div className="flex items-center flex-wrap">
                <Label className="w-[150px] flex-none" htmlFor="categoryName">
                  Category Name
                </Label>
                <Input
                    id="categoryName"
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
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
          <Button onClick={addCategory} disabled={loading}>
            {loading ? "Loading..." : "Add Category"}
          </Button>
        </div>
      </div>
  );
};

export default AddCategory;