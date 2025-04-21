import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const EditCategory = () => {
  return (
    <div className=" grid grid-cols-12  gap-4  rounded-lg">
      <div className="col-span-12 ">
        <Card>
          <CardHeader className="border-b border-solid border-default-200 mb-6">
            <CardTitle>Category Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center flex-wrap">
              <Label className="w-[150px] flex-none" htmlFor="h_Fullname">
                Category Name
              </Label>
              <Input id="h_Fullname" type="text" placeholder="Full name" />
            </div>
          </CardContent>
          <CardContent className="space-y-4">
            <div className="flex items-center flex-wrap">
              <Label className="w-[150px] flex-none" htmlFor="h_Fullname">
                 Pref
              </Label>
              <Input id="h_Fullname" type="text" placeholder="Pref" />
            </div>
          </CardContent>
          <CardContent className="space-y-4">
            <div className="flex items-center flex-wrap">
              <Label className="w-[150px] flex-none" htmlFor="h_Fullname">
                Discription
              </Label>
              <Textarea id="h_Fullname" placeholder="Discription" />
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="col-span-12 flex justify-end">
        <Button>Update Category</Button>
      </div>
    </div>
  );
};

export default EditCategory;
