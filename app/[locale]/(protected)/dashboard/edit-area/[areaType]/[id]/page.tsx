"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {useRouter} from "@/i18n/routing";
import {useParams} from "next/navigation";
import {dummyAreas} from "@/app/[locale]/(protected)/dashboard/area/transactions/data";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {Area} from "@/types/areas";


const EditArea = () => {
  const router = useRouter();
  const params = useParams();
  const areaType = params?.areaType as string;
    const areaId = params?.id as string;

  const [name, setName] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [mainArea, setMainArea] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (areaType) {
      const area = dummyAreas.find((m: Area) => m.id === areaId);
      if (area) {
        setName(area.name);
        setDescription(area.description);
        setIsActive(area.isActive);
        if (areaType === "secondary") {
          setMainArea(area?.mainAreaId || "");
        } else {
          setMainArea(""); // Reset main area for main type
        }
      } else {
        toast.error("Area not found");
      }
    }
  }, [areaType]);

  const updateArea = async () => {
    if (!name.trim()) {
      toast.error("Validation Error", { description: "Area Name is required." });
      return;
    }
    if (!description.trim()) {
      toast.error("Validation Error", { description: "Description is required." });
      return;
    }

    try {
      setLoading(true);
      const success = true; // Simulated success
      setLoading(false);

      if (success) {
        toast.success("Area Updated", {
          description: "Area updated successfully!",
        });
        setTimeout(() => {
          router.push("/dashboard/area");
        }, 1000);
      }
    } catch (error: any) {
      toast.error("Network Error", {
        description: error?.message || "Something went wrong",
      });
    }
  };

  return (
      <div className="grid grid-cols-12 gap-4 rounded-lg">
        <div className="col-span-12">
          <Card>
            <CardHeader className="border-b border-solid border-default-200 mb-6">
              <CardTitle>Edit Area</CardTitle>
            </CardHeader>

            {areaType === "secondary" && (
                <CardContent className="space-y-4">
                  <div className="flex items-center flex-wrap">
                    <Label className="w-[150px] flex-none" htmlFor="mainArea">
                      Main Area
                    </Label>
                    <Select
                        value={mainArea}
                        onValueChange={(value) => setMainArea(value)} // value is area.id
                    >
                      <SelectTrigger id="mainArea" className="flex-1">
                        <SelectValue placeholder="Main Area" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Available Main Areas</SelectLabel>
                          {dummyAreas
                              .filter((area) => area.type === "main")
                              .map((area) => (
                                  <SelectItem key={area.id} value={area.id}>
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
          <Button onClick={updateArea} disabled={loading}>
            {loading ? "Updating..." : "Update Area"}
          </Button>
        </div>
      </div>
  );
};

export default EditArea;