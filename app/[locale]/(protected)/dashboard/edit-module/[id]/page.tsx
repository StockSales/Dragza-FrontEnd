"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {modules} from "@/app/[locale]/(protected)/dashboard/modules/transactions/data";
import {useRouter} from "@/i18n/routing";
import {useParams} from "next/navigation";


const EditModule = () => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [name, setName] = useState("");
  const [pref, setPref] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      // eslint-disable-next-line @next/next/no-assign-module-variable
      const module = modules.find((m) => m.id === id);
      if (module) {
        setName(module.name);
        setPref(module.pref);
        setDescription(module.description);
      } else {
        toast.error("Module not found");
      }
    }
  }, [id]);

  const updateModule = async () => {
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
      setLoading(true);
      const success = true; // Simulated success
      setLoading(false);

      if (success) {
        toast.success("Module Updated", {
          description: "Module updated successfully!",
        });
        setTimeout(() => {
          router.push("/dashboard/modules");
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
              <CardTitle>Edit Module</CardTitle>
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
          <Button onClick={updateModule} disabled={loading}>
            {loading ? "Updating..." : "Update Module"}
          </Button>
        </div>
      </div>
  );
};

export default EditModule;