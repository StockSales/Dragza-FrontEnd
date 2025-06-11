"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useRouter } from "@/i18n/routing";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {useParams} from "next/navigation";
import {dummyAreas} from "@/app/[locale]/(protected)/dashboard/area/transactions/data";

const AddArea = () => {
  const router = useRouter();
  const params = useParams();
  const areaType = params?.areaType as string;

  const [name, setName] = useState("");
  const [pref, setPref] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [mainArea, setMainArea] = useState("");
  const [loading, setLoading] = useState(false);

  const addArea = async () => {
    if (!name.trim()) {
      toast.error("Validation Error", { description: "Area Name is required." });
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
      setLoading(true)
      const success = true
      setLoading(false)
      if (success) {
        toast.success("Area Added", {
          description: "Area added successfully!",
        });
        setTimeout(() => {
          router.push("/dashboard/area");
        }, 1000);
      }
    } catch (error: any) {
      toast.error("Network Error", {
        description: error,
      });
    }
  };

  return (
      <div className="grid grid-cols-12 gap-4 rounded-lg">
        <div className="col-span-12">
          <Card>
            <CardHeader className="border-b border-solid border-default-200 mb-6">
              <CardTitle>Area Information</CardTitle>
            </CardHeader>
            {areaType === "secondary" && (
                <CardContent className="space-y-4">
                    <div className="flex items-center flex-wrap">
                    <Label className="w-[150px] flex-none" htmlFor="mainArea">
                        Main Area
                    </Label>
                    <Select
                        value={mainArea}
                        onValueChange={(value) => setMainArea(value)}
                    >
                        <SelectTrigger id="mainArea" className="flex-1">
                            <SelectValue placeholder="Main Area" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Available Main Areas</SelectLabel>
                            {dummyAreas
                                .filter(area => area.type === "main")
                                .map((area) => (
                                    <SelectItem key={area.id} value={area.name}>
                                        {area.name}
                                    </SelectItem>
                                ))}
                          </SelectGroup>
                        </SelectContent>
                    </Select>
                    </div>
                </CardContent>
            )}
            <CardContent className="space-y-4">
              <div className="flex items-center flex-wrap">
                <Label className="w-[150px] flex-none" htmlFor="areaName">
                  Area Name
                </Label>
                <Input
                    id="areaName"
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
              </div>
            </CardContent>
            <CardContent className="space-y-4">
              <div className="flex items-center flex-wrap">
                <Label className="w-[150px] flex-none" htmlFor="Pref">
                  Pref
                </Label>
                <Input
                    id="Pref"
                    type="text"
                    placeholder="Pref"
                    value={pref}
                    onChange={(e) => setPref(e.target.value)}
                />
              </div>
            </CardContent>
            <CardContent className="space-y-4">
              <div className="flex items-center flex-wrap">
                <Label className="w-[150px] flex-none" htmlFor="Description">
                  Description
                </Label>
                <Textarea
                    id="Description"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </CardContent>
            <CardContent className="space-y-4">
              <div className="flex items-center flex-wrap">
                <Label className="w-[150px] flex-none" htmlFor="isActive">
                  Active
                </Label>
                <Select
                    value={String(isActive)}
                    onValueChange={(value) => setIsActive(value === "true")}
                >
                  <SelectTrigger id="isActive" className="flex-1">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">True</SelectItem>
                    <SelectItem value="false">False</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="col-span-12 flex justify-center">
          <Button onClick={addArea} disabled={loading}>
            {loading ? "Loading..." : "Add Area"}
          </Button>
        </div>
      </div>
  );
};

export default AddArea;