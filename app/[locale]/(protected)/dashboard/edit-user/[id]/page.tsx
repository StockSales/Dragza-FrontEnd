"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useRouter } from "@/i18n/routing";
import { useParams } from "next/navigation";
import useGetCategoryById from "@/services/categories/getCategoryById";
import Loader from "@/components/loader";
import useUpdateCategoryById from "@/services/categories/UpdateCatergory";
import {Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue} from "@/components/ui/select";
import {UserRole, UserRoleLabel} from "@/enum";

const EditCategory = () => {
  // Router navigator
  const router = useRouter();

  // Params
  const params = useParams();
  const id = params?.id;

  const error = false
  const [updatingCategoryLoading, setUpdatingCategoryLoading] = useState(false);

  // API Call need to get the user`s data

  // Form states
  const [name, setName] = useState("");
  const [pref, setPref] = useState("");
  const [description, setDescription] = useState("");
  const [userRole, setUserRole] = useState("");



  // Handle update (you'd normally call an update API here)
  const updateCategory = () => {
    setUpdatingCategoryLoading(true);
    if (!userRole.trim()) {
      toast.error("Validation Error", { description: "Category Name is required." });
      return;
    }

    // Simulate update success (replace with real update logic)
    // updatingCategoryById(id, { name, pref, description });
    if ( error !== null ) {
      setUpdatingCategoryLoading(false)
      toast.success("User Updated", {
        description: "User Updated Successfully"
      });
      setTimeout(() => {
        router.push('/dashboard/user-rules');
      }, 2000);
    } else if (error) {
      setUpdatingCategoryLoading(false)
      toast.error("Something went wrong", {
        description: error || "Please, reload the page"
      })
      setTimeout(() => {
        router.push('/dashboard/user-rules');
      }, 2000);
    }
  };

  return (
      <div className="grid grid-cols-12 gap-4 rounded-lg">
        <div className="col-span-12">
          <Card>
            <CardHeader className="border-b border-solid border-default-200 mb-6">
              <CardTitle>User Information</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex items-center flex-wrap">
                <Label className="w-[150px] flex-none" htmlFor="Role">User Role</Label>
                <Select onValueChange={(value: UserRole) => setUserRole(value)} value={userRole}>
                  <SelectTrigger className="flex-1 cursor-pointer">
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Role</SelectLabel>
                      {Object.entries(UserRoleLabel).map(([id, label]) => (
                          <SelectItem key={id} value={id}>
                            {label}
                          </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="col-span-12 flex justify-center">
          <Button onClick={updateCategory}>
            {updatingCategoryLoading ? (
                <div className="flex flex-row gap-3 items-center">
                  <Loader />
                  <p>Loading...</p>
                </div>
            ) : (
                "Update User type"
            )}
          </Button>
        </div>
      </div>
  );
};

export default EditCategory;