import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {Download, Eye, Trash2} from "lucide-react";
import {Link} from "@/i18n/routing";

export type DataProps = {
  id: string | number;
  order: number;
  customer: {
    name: string;
    image: string;
  };
  inventory: {
    name: string;
    phone: string;
  }
  date: string;
  quantity: number;
  amount: string;
  reason: string;
  method: string;
  status: "paid" | "due" | "canceled";
  action: React.ReactNode;
};
export const columns: ColumnDef<DataProps>[] = [
  {
    accessorKey:"name",
    header: "Inventory Name",
    cell: ({ row }) => {
      const inventory = row.original.inventory;
      return (
          <span className="text-sm text-default-600 whitespace-nowrap">
            {inventory?.name ?? "Unknown Inventory"}
          </span>
      );
    }
  },

  {
    accessorKey:"phone",
    header: "Inventory phone",
    cell: ({ row }) => {
      const inventory = row.original.inventory;
      return (
          <span className="text-sm text-default-600 whitespace-nowrap">
            {inventory?.phone ?? "Unknown Inventory"}
          </span>
      );
    }
  },

  {
    accessorKey: "order",
    header: "Order Number",
    cell: ({ row }) => <span>{row.getValue("order")}</span>,
  },
  {
    accessorKey: "customer",
    header: "Pharmacy Name",
    cell: ({ row }) => {
      const user = row.original.customer;
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
    accessorKey: "reason",
    header: "Reason",
    cell: ({ row }) => {
      return <span>{row.getValue("reason")}</span>;
    },
  },
  {
    accessorKey: "status",
    header: "Payment Status",
    cell: ({ row }) => {
      const statusColors: Record<string, string> = {
        paid: "bg-success/20 text-success",
        due: "bg-warning/20 text-warning",
        canceled: "bg-destructive/20 text-destructive",
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
      return (
        <div className="flex items-center gap-1">
          <Link
            href={`/dashboard/return-details/${row.original.id}`}
            className="flex items-center p-2 border-b text-warning hover:text-warning-foreground bg-warning/20 hover:bg-warning duration-200 transition-all rounded-full"
          >
            <Eye className="w-4 h-4" />
          </Link>
        </div>
      );
    },
  },
];
