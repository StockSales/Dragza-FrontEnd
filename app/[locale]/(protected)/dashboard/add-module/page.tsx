"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useRouter } from "@/i18n/routing";

const AddModule = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [pref, setPref] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const addModule = async () => {
    if (!name.trim()) {
      toast.error("Validation Error", { description: "Module Name is required." });
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
        toast.success("Module Added", {
          description: "Module added successfully!",
        });
        setTimeout(() => {
          router.push("/dashboard/modules");
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
              <CardTitle>Module Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center flex-wrap">
                <Label className="w-[150px] flex-none" htmlFor="moduleName">
                  Module Name
                </Label>
                <Input
                    id="moduleName"
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
          </Card>
        </div>
        <div className="col-span-12 flex justify-center">
          <Button onClick={addModule} disabled={loading}>
            {loading ? "Loading..." : "Add Module"}
          </Button>
        </div>
      </div>
  );
};

export default AddModule;