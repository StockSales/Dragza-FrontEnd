import { ColumnDef } from "@tanstack/react-table";
import {
  Download,
  Eye,
  Trash2,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Link } from '@/i18n/routing';
import {toast} from "sonner";
import {Button} from "@/components/ui/button";

export type DataProps = {
  id: string | number;
  user: {
    name: string;
    image: string;
  };
  phone: string;
  email: string;
  status: "admin" | "manager" | "user";
  action: React.ReactNode;
};
export const columns: ColumnDef<DataProps>[] = [
  {
    accessorKey: "user",
    header: "Username",
    cell: ({ row }) => {
      const user = row.original.user;
      return (
        <div className="font-medium text-card-foreground/80">
          <div className="flex gap-3 items-center">
            <Avatar className="rounded-full w-8 h-8">
              {user?.image ? (
                <AvatarImage src={user.image} />
              ) : (
                <AvatarFallback>AB</AvatarFallback>
              )}
            </Avatar>
            <span className="text-sm text-default-600 whitespace-nowrap">
              {user?.name ?? "Unknown User"}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => {
      const phone = row.original.phone;
      return <div className="text-sm text-default-600">{phone}</div>;
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      const email = row.original.email;
      return <div className="text-sm text-default-600">{email}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Rule",
    cell: ({ row }) => {
      const statusColors: Record<string, string> = {
        admin: "bg-success/20 text-success",
        manager: "bg-warning/20 text-warning",
        user: "bg-destructive/20 text-destructive",
      };
      const status = row.getValue<string>("status");
      const statusStyles = statusColors[status] || "default";
      return (
        <Badge className={cn("rounded-full px-5", statusStyles)}>
          {status}{" "}
        </Badge>
      );
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

      // deleting the user
      const deleteUser = (id: string | number) => {
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
                    className="text-white px-3 py-1 rounded-md"
                    onClick={() => {
                      console.log("deleted user", id);
                      toast.dismiss(toastId); // Dismiss confirmation toast
                      toast("User deleted", {
                        description: "The user was deleted successfully.",
                      });
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
              onClick={() => deleteUser(id)}
            className="flex items-center p-2 text-destructive bg-destructive/40 duration-200 transition-all hover:bg-destructive/80 hover:text-destructive-foreground rounded-full cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
          </div>
        </div>
      );
    },
  },
];
