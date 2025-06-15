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
import useGettingAllMainAreas from "@/services/area/gettingAllMainAreas";
import gettingAllMainAreas from "@/services/area/gettingAllMainAreas";
import {Loader2} from "lucide-react";
import useUpdateMainArea from "@/services/area/updateMainArea";
import MapSelector from "@/components/partials/MapSelector/MapSelector";


const EditArea = () => {
  // getting all main area
  const {loading: mainAreaLoading, mainAreas, getAllMainAreas, error: mainAreaError} = useGettingAllMainAreas()

  // update area
  const {loading: updateAreaLoading, updateMainArea, error: updateAreaError} = useUpdateMainArea()

  const router = useRouter();
  const params = useParams();
  const areaType = params?.areaType as string;
    const areaId = params?.id as string;

  const [name, setName] = useState("");
  const [lat, setLat] = useState("");
  const [lang, setLang] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [mainArea, setMainArea] = useState("");

  useEffect(() => {
    if (mainAreas.length > 0) {
      const area = mainAreas.find((m: Area) => m.id === areaId);
      if (!area) {
        toast.error("Area not found");
        return;
      }

      if (areaType === "main") {
        setName(area.regionName);
        setLat(area.lat || "");
        setLang(area.lang || "");
        setIsActive(area.isActive);
        setMainArea(""); // reset main area
      }

      if (areaType === "secondary") {
        setName(area.name);
        setMainArea(area?.mainAreaId || "");
        setLat(area.lat || "");
        setLang(area.lang || "");
      }
    }
  }, [mainAreas]);

  const updateArea = async () => {
    if (!name.trim()) {
      toast.error("Validation Error", { description: "Area Name is required." });
      return;
    }
    if (!lat.trim()) {
        toast.error("Validation Error", { description: "Latitude is required." });
        return;
    }
    if (!lang.trim()) {
        toast.error("Validation Error", { description: "Longitude is required." });
        return;
    }

    try {
      const {success, error} = await updateMainArea(areaId, {regionName: name, lat, lang, isActive});

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

  useEffect(() => {
    getAllMainAreas()
  }, []);

  if (mainAreaLoading) {
    return (
        <div className="flex items-center justify-center h-full">
            <Loader2 className="w-6 h-6 animate-spin" />
        </div>
    )
  }

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
                          {mainAreas
                              .filter((area) => area.type === "main")
                              .map((area) => (
                                  <SelectItem key={area.id} value={area.id}>
                                    {area.regionName}
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

            {areaType === "main" && (
                <CardContent className="space-y-4">
                  <div className="flex flex-col gap-4">
                    <Label>Pick Location on Map (Egypt)</Label>
                    <div className="flex-1">
                      <MapSelector
                          lat={lat}
                          lang={lang}
                          onChange={(newLat, newLang) => {
                            setLat(newLat);
                            setLang(newLang);
                          }}
                      />
                    </div>
                  </div>
                </CardContent>
            )}

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
                    <SelectItem value="true">Active</SelectItem>
                    <SelectItem value="false">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="col-span-12 flex justify-center">
          <Button onClick={updateArea} disabled={updateAreaLoading}>
            {updateAreaLoading ? "Updating..." : "Update Area"}
          </Button>
        </div>
      </div>
  );
};

export default EditArea;