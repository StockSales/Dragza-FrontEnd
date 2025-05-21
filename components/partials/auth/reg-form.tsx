"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import useRegister from "@/services/auth/register";
import {toast} from "sonner";
import {Cookie} from "lucide-react";
import Cookies from "js-cookie";

type Inputs = {
    BussinesName: string;
    IsPharmacy: boolean;
    IsActive: boolean;
    UserName: string;
    NomalizedUserName: string;
    Email: string;
    EmailConfirmed: boolean;
    Password: string;
    PhoneNumber: string;
    PhoneConfirmed: boolean;
    RegionName: string;
    DesName: string;
    RoleId: string;
};

const RegForm = () => {
    const {registerUser} = useRegister()

    const userRole = Cookies.get("userRole");
    
    const {
        register,
        handleSubmit,
        watch,
        control,
        setValue
    } = useForm<Inputs>({
        defaultValues: {
            IsActive: true,
            EmailConfirmed: true,
            PhoneConfirmed: true,
            IsPharmacy: false,
            RegionName: "",
            DesName: "",
        },
    });

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            const formData = new FormData();

            // Append all fields manually
            Object.entries(data).forEach(([key, value]) => {
                formData.append(key, value.toString());
            });

            // Call the registerUser with formData
            const result = await registerUser(formData); // You must adjust registerUser to accept FormData

            if (result) {
                toast.success("Registration successful!");
            }
        } catch (error) {
            toast.error("Registration failed. Please try again.");
            console.error("Registration error:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Phone */}
            <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" placeholder="02123456789" {...register("PhoneNumber")} />
            </div>

            {/* Business Name */}
            <div className="space-y-2">
                <Label htmlFor="businessName">Business Name</Label>
                <Input id="businessName" placeholder="Business Name" {...register("BussinesName")} />
            </div>

            {/* User Name */}
            <div className="space-y-2">
                <Label htmlFor="userName">Username</Label>
                <Input id="userName" {...register("UserName")} onChange={(e) => {
                    const value = e.target.value;
                    setValue("UserName", value);
                    setValue("NomalizedUserName", value.toLowerCase());
                }} />
            </div>

            {/* Email */}
            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" {...register("Email")} />
            </div>

            {/* Password */}
            <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                    id="password"
                    type="password"
                    placeholder="Password"
                    {...register("Password", { required: true })}
                />
            </div>

            {/* User Type */}
            <div className="space-y-2">
                <Controller
                    name="RoleId"
                    control={control}
                    render={({ field }) => (
                        <>
                            <Label htmlFor="userType">User Type</Label>
                            <Select onValueChange={field.onChange} value={field.value}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="E48E5A9F-2074-4DE9-A849-5C69FDD45E4E">Pharmacy</SelectItem>
                                    {userRole == "Admin" && (
                                        <>
                                            <SelectItem value="1A5A84FB-23C3-4F9B-A122-4C5BC6C5CB2D">Inventory Manager</SelectItem>
                                            <SelectItem value="8C2F4F3A-7F6D-4DB8-8B02-4A04D31F35D6">Admin</SelectItem>
                                        </>
                                    )}
                                </SelectContent>
                            </Select>
                        </>
                    )}
                />
            </div>

            {/* Region Name */}
            <div className="space-y-2">
                <Label htmlFor="regionName">Region</Label>
                <Input id="regionName" placeholder="e.g. Cairo" {...register("RegionName")} />
            </div>

            {/* Description Name */}
            <div className="space-y-2">
                <Label htmlFor="desName">Des Name</Label>
                <Input id="desName" placeholder="Des Name" {...register("DesName")} />
            </div>

            {/* Confirm Terms */}
            <div className="flex gap-2 items-center">
                <Checkbox id="terms" defaultChecked />
                <Label htmlFor="terms">
                    You Accept Our Terms And Conditions And Privacy Policy
                </Label>
            </div>

            <Button type="submit" fullWidth>
                Create An Account
            </Button>
        </form>
    );
};

export default RegForm;