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

type Inputs = {
    phone: string;
    userType: string;
    password: string;
    businessName: string;
    isPharmacy: boolean;
    isActive: boolean;
    userName: string;
    normalizedUserName: string;
    email: string;
    emailConfirmed: boolean;
    phoneConfirmed: boolean;
    regionName: string;
    desName: string;
    lang: string;
    lat: string;
    roleId: string;
};

const RegForm = () => {
    const {registerUser} = useRegister()

    const {
        register,
        handleSubmit,
        watch,
        control,
        setValue
    } = useForm<Inputs>({
        defaultValues: {
            isActive: true,
            emailConfirmed: true,
            phoneConfirmed: true,
        },
    });

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            const result = await registerUser(data);
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
                <Input id="phone" placeholder="+02123456789" {...register("phone")} />
            </div>

            {/* User Type */}
            <div className="space-y-2">
                <Controller
                    name="roleId"
                    control={control}
                    render={({ field }) => (
                        <>
                            <Label htmlFor="userType">User Type</Label>
                            <Select onValueChange={field.onChange} value={field.value}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1A5A84FB-23C3-4F9B-A122-4C5BC6C5CB2D">Inventory Manager</SelectItem>
                                    <SelectItem value="E48E5A9F-2074-4DE9-A849-5C69FDD45E4E">Pharmacy</SelectItem>
                                    <SelectItem value="8C2F4F3A-7F6D-4DB8-8B02-4A04D31F35D6">Admin</SelectItem>
                                </SelectContent>
                            </Select>
                        </>
                    )}
                />
            </div>

            {/* Password */}
            <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                    id="password"
                    type="password"
                    placeholder="Password"
                    {...register("password", { required: true })}
                />
            </div>

            {/* Business Name */}
            <div className="space-y-2">
                <Label htmlFor="businessName">Business Name</Label>
                <Input id="businessName" placeholder="Business Name" {...register("businessName")} />
            </div>

            {/* Is Pharmacy */}
            <Controller
                name="isPharmacy"
                control={control}
                defaultValue={false}
                render={({ field }) => (
                    <div className="flex items-center gap-2">
                        <Checkbox
                            id="isPharmacy"
                            checked={field.value}
                            onCheckedChange={(checked) => field.onChange(!!checked)} // force to boolean
                        />
                        <Label htmlFor="isPharmacy">Is Pharmacy?</Label>
                    </div>
                )}
            />

            {/* User Name */}
            <div className="space-y-2">
                <Label htmlFor="userName">Username</Label>
                <Input id="userName" {...register("userName")} onChange={(e) => {
                    const value = e.target.value;
                    setValue("userName", value);
                    setValue("normalizedUserName", value.toLowerCase());
                }} />
            </div>

            {/* Email */}
            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" {...register("email")} />
            </div>

            {/* Region Name */}
            <div className="space-y-2">
                <Label htmlFor="regionName">Region</Label>
                <Input id="regionName" placeholder="e.g. Cairo" {...register("regionName")} />
            </div>

            {/* Description Name */}
            <div className="space-y-2">
                <Label htmlFor="desName">Des Name</Label>
                <Input id="desName" placeholder="Des Name" {...register("desName")} />
            </div>

            {/* Language */}
            <div className="space-y-2">
                <Controller
                    name="lang"
                    control={control}
                    render={({ field }) => (
                        <>
                            <Label htmlFor="lang">Language</Label>
                            <Select onValueChange={field.onChange} value={field.value}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Language" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="English">English</SelectItem>
                                    <SelectItem value="Arabic">Arabic</SelectItem>
                                </SelectContent>
                            </Select>
                        </>
                    )}
                />
            </div>

            {/* Latitude */}
            <div className="space-y-2">
                <Label htmlFor="lat">Latitude</Label>
                <Input id="lat" placeholder="Latitude" {...register("lat")} />
            </div>

            {/* Role ID (hidden or fixed) */}
            <input type="hidden" {...register("roleId")} />

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