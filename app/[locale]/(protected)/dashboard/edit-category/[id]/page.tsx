"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {toast} from "sonner";
import {useState} from "react";
import {useRouter} from "@/i18n/routing";
import { useParams } from "next/navigation";
import {data} from "@/app/[locale]/(protected)/dashboard/categories/transactions/data";

const EditCategory = () => {
  // handling to get id of the category
  const params = useParams();
  const id = params?.id;

  // handling to get category data
  const gettingCategory = (id) => {
    const category = data.filter((item) => item.id == id);
    return category[0];
  }

  // Router navigator
  const router = useRouter();

  // states for the form
  const [name, setName] = useState(gettingCategory(id).category);
  const [pref, setPref] = useState(gettingCategory(id).pref);
  const [description, setDescription] = useState(gettingCategory(id).disc);

  // handle update category
  const updateCategory = () => {
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

    toast.success("Category Updated", {
      description: "Category Updated Successfully"
    })

    setTimeout(() => {
      router.push('/dashboard/categories');
    }, 2000);
  }

  return (
    <div className=" grid grid-cols-12  gap-4  rounded-lg">
      <div className="col-span-12 ">
        <Card>
          <CardHeader className="border-b border-solid border-default-200 mb-6">
            <CardTitle>Category Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center flex-wrap">
              <Label className="w-[150px] flex-none" htmlFor="h_Fullname">
                Category Name
              </Label>
              <Input
                  id="h_Fullname"
                  type="text"
                  placeholder="Full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
              />
            </div>
          </CardContent>
          <CardContent className="space-y-4">
            <div className="flex items-center flex-wrap">
              <Label className="w-[150px] flex-none" htmlFor="h_Fullname">
                 Pref
              </Label>
              <Input
                  id="h_Fullname"
                  type="text"
                  placeholder="Pref"
                  value={pref}
                  onChange={(e) => setPref(e.target.value)}
              />
            </div>
          </CardContent>
          <CardContent className="space-y-4">
            <div className="flex items-center flex-wrap">
              <Label className="w-[150px] flex-none" htmlFor="h_Fullname">
                Discription
              </Label>
              <Textarea
                  id="h_Fullname"
                  placeholder="Discription"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="col-span-12 flex justify-center">
        <Button
            onClick={updateCategory}
        >
          Update Category
        </Button>
      </div>
    </div>
  );
};

export default EditCategory;
