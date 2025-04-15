
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


type Inputs = {
    phone: string;
    userType: string;
    password: string;
};

const RegForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    control
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  console.log(watch("phone"));

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          placeholder="+02123456789"
          {...register("phone")}
          size="lg"
        />
      </div>
      <div className="space-y-2">
          <Controller
              name="userType"
              control={control}
              render={({ field }) => (
                  <div className="space-y-2">
                      <Label htmlFor="userType">User Type</Label>
                      <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger>
                              <SelectValue placeholder="Select a role" />
                          </SelectTrigger>
                          <SelectContent>
                              <SelectItem value="inventory">Inventory Manager</SelectItem>
                              <SelectItem value="sales">Sales</SelectItem>
                          </SelectContent>
                      </Select>
                  </div>
              )}
          />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="Password"
          {...register("password", { required: true })}
          size="lg"
        />
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <Checkbox
            id="checkbox"
            defaultChecked
          />
          <Label htmlFor="checkbox">
            You Accept Our Terms And Conditions And Privacy Policy
          </Label>
        </div>
      </div>

      <Button type="submit" fullWidth>
        Create An Account
      </Button>
    </form>
  );
};
export default RegForm;
