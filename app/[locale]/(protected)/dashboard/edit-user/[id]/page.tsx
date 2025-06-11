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
import useGettingUserById from "@/services/users/gettingUserById";
import useDeactivateUser from "@/services/users/DeactivateUsers";
import {Loader2} from "lucide-react";

const EditCategory = () => {
  // Params
  const params = useParams();
  const id = params?.id;

  // getting user Data by id
  const {error, loading, user, getUserById} = useGettingUserById()

  // Deactivate user
  const { deactivateUser, loading: deactivateUserLoading, error: deactivateUserError } = useDeactivateUser()

  // Router navigator
  const router = useRouter();

  // state for activation user
  const [activate, setActivate] = useState(false);
  const [userRole, setUserRole] = useState<UserRole | undefined>(undefined);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [minOrder, setMinOrder] = useState(0);
  const [region, setRegion] = useState("");

  // Handle update (you'd normally call an update API here)
  const updateUser = async () => {
    // if (!user || !id || !userRole) {
    //   toast.error("Validation Error", { description: "All fields are required." });
    //   return;
    // }

    // const payload = {
    //   userName,
    //   email,
    //   phoneNumber,
    //   businessName,
    //   minOrder,
    //   region,
    //   isActive: activate,
    //   roleId: userRole
    // };

    try {
      const {success, error} =  await deactivateUser(id);
      if (success) {
        toast.success("User Updated", { description: "User updated successfully." });
        setTimeout(() => {
          router.push("/dashboard/user-rules");
        }, 1000)
      } else if (error) {
        throw new Error(error)
      }
    } catch (err) {
      toast.error("Update Failed", {
        description: err instanceof Error ? err.message : "Something went wrong.",
      });
    }
  };

  useEffect(() => {
    if (user) {
      setUserRole(user?.roleId as UserRole);
      setActivate(user?.isActive);
      setUserName(user?.userName);
      setEmail(user?.email);
      setPhoneNumber(user?.phoneNumber);
      setBusinessName(user?.businessName);
      setMinOrder(user?.minOrder);
      setRegion(user?.region || "N/A");
    }
  }, [user]);

  useEffect(() => {
    getUserById(id);
  }, []);


  return (
      <div className="gap-4 rounded-lg">
        {loading ? (
            <div className="flex mx-auto justify-center items-center">
              <Loader2 className="animate-spin" />
            </div>
        ) : (
          <>
            <div className="col-span-12">
              <Card>
                <CardHeader className="border-b border-solid border-default-200 mb-6">
                  <CardTitle>User Information</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex items-center flex-wrap">
                    <Label className="w-[150px] flex-none" htmlFor="userName">Username</Label>
                    <Input
                        id="userName"
                        className="flex-1"
                        value={userName}
                        disabled
                        onChange={(e) => setUserName(e.target.value)}
                    />
                  </div>

                  <div className="flex items-center flex-wrap">
                    <Label className="w-[150px] flex-none" htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        className="flex-1"
                        value={email}
                        disabled
                        onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="flex items-center flex-wrap">
                    <Label className="w-[150px] flex-none" htmlFor="phone">Phone</Label>
                    <Input
                        id="phone"
                        className="flex-1"
                        value={phoneNumber}
                        disabled
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>

                  <div className="flex items-center flex-wrap">
                    <Label className="w-[150px] flex-none" htmlFor="business">Business Name</Label>
                    <Input
                        id="business"
                        className="flex-1"
                        value={businessName}
                        disabled
                        onChange={(e) => setBusinessName(e.target.value)}
                    />
                  </div>

                  <div className="flex items-center flex-wrap">
                    <Label className="w-[150px] flex-none" htmlFor="region">Region</Label>
                    <Input
                        id="region"
                        className="flex-1"
                        disabled
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
                    />
                  </div>

                  <div className="flex items-center flex-wrap">
                    <Label className="w-[150px] flex-none" htmlFor="minOrder">Min Order</Label>
                    <Input
                        id="minOrder"
                        type="number"
                        className="flex-1"
                        disabled
                        value={minOrder}
                        onChange={(e) => setMinOrder(Number(e.target.value))}
                    />
                  </div>

                  <div className="flex items-center flex-wrap">
                    <Label className="w-[150px] flex-none" htmlFor="active">Active Status</Label>
                    <Select value={activate ? "true" : "false"} onValueChange={(value) => setActivate(value === "true")}>
                      <SelectTrigger className="flex-1 cursor-pointer">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">Active</SelectItem>
                        <SelectItem value="false">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="col-span-12 flex justify-center mt-4">
              <Button onClick={updateUser}>
                {deactivateUserLoading ? (
                    <div className="flex flex-row gap-3 items-center">
                      <Loader />
                      <div className="flex justify-center items-center">
                        <Loader2 className="text-white animate-spin"/>
                      </div>
                    </div>
                ) : (
                    "Update user activation"
                )}
              </Button>
            </div>
          </>
        )}
      </div>
  );
};

export default EditCategory;