import { ColumnDef } from "@tanstack/react-table";
import {
  SquarePen,
  Trash2,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {toast} from "sonner";
import {Button} from "@/components/ui/button";
import {Link, usePathname} from "@/i18n/routing";
import useDeleteUser from "@/services/users/DeleteUser";

export type DataProps = {
  id: string | number;
  userName: string;
  email: string;
  phoneNumber: string;
  businessName: string;
  isPharmacy: boolean;
  region: string;
  action: React.ReactNode;
};
export const columns: ColumnDef<DataProps>[] = [
  {
    accessorKey: "userName",
    header: "Username",
    cell: ({ row }) => {
      const user = row.original.userName;
      return (
          <div className="text-sm text-default-600">{user}</div>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      const email = row.original.email;
      return (
          <div className="text-sm text-default-600">{email}</div>
      );
    },
  },
  {
    accessorKey: "businessName",
    header: "Business Name",
    cell: ({ row }) => {
      const businessName = row.original.businessName;
      return (
          <div className="text-sm text-default-600">{businessName}</div>
      );
    },
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
    cell: ({ row }) => {
      const phone = row.original.phoneNumber;
      return <div className="text-sm text-default-600">{phone}</div>;
    },
  },
  {
    accessorKey: "isPharmacy",
    header: "Is Pharmacy?",
    cell: ({ row }) => {
      const isPharmacy = row.original.isPharmacy;
      return <div className="text-sm text-default-600">{isPharmacy === true ? "Yes" : "No"}</div>;
    },
  },
  {
    accessorKey: "region",
    header: "Region",
    cell: ({ row }) => {
      const region = row.original.region;
      return <div className="text-sm text-default-600">{region || "N/A"}</div>;
    },
  },
  {
    id: "actions",
    accessorKey: "action",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      // getting the selected user Id
      const id: string | number = row.original.id;
      const pathname = usePathname();
      const { deleteUser, loading, isDeleted } = useDeleteUser();

      const handleDelete = () => {
        const toastId = toast("Delete User", {
          description: "Are you sure you want to delete this user?",
          action: (
              <div className="flex justify-end mx-auto items-center my-auto gap-2">
                <Button
                    size="sm"
                    onClick={() => toast.dismiss(toastId)}
                    className="text-white px-3 py-1 rounded-md"
                >
                  Cancel
                </Button>
                <Button
                    size="sm"
                    variant="shadow"
                    disabled={loading}
                    className="text-white px-3 py-1 rounded-md"
                    onClick={async () => {
                      try {
                        await deleteUser(id);
                        toast.dismiss(toastId);
                        if (isDeleted) {
                          toast("User deleted", {
                            description: "The user was deleted successfully.",
                          });
                        }
                      } catch (error) {
                        toast.dismiss(toastId);
                        toast("Error", {
                          description: (error as Error).message,
                        });
                      }
                    }}
                >
                  Confirm
                </Button>
              </div>
          ),
        });
      };

      return (
          <div className="flex items-center gap-1">
            <div
                onClick={handleDelete}
                className="flex items-center p-2 text-destructive bg-destructive/40 duration-200 transition-all hover:bg-destructive/80 hover:text-destructive-foreground rounded-full cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
            </div>
          </div>
      );
    },
  },
];
