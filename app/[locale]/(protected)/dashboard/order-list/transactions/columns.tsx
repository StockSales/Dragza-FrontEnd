import { ColumnDef } from "@tanstack/react-table";
import {
  Eye,
  Trash2,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {Link, useRouter} from '@/i18n/routing';
import {toast} from "sonner";
import {Button} from "@/components/ui/button";

export type DataProps = {
  id: string | number;
  order: number;
  customer: {
    name: string;
    image: string;
  };
  date: string;
  quantity: number;
  amount: string;
  method: string;
  order_status: "approve" | "prepare" | "reject" | "ship" | "deliver" | "complete";
  status: "paid" | "due" | "canceled";
  action: React.ReactNode;
};
export const columns: ColumnDef<DataProps>[] = [
  {
    accessorKey: "order",
    header: "Order",
    cell: ({ row }) => <span>{row.getValue("order")}</span>,
  },
  {
    accessorKey: "customer",
    header: "Customer Name",
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
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      return <span>{row.getValue("date")}</span>;
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      return <span>{row.getValue("amount")}</span>;
    },
  },
  {
    accessorKey: "method",
    header: "Payment Method",
    cell: ({ row }) => {

      return <span> {row.getValue("method")}</span>;

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
    accessorKey: "order_status",
    header: "Order Status",
    cell: ({ row }) => {
      const statusColors: Record<string, string> = {
        approve: "bg-success/20 text-success",
        complete: "bg-success/40 text-success",
        prepare: "bg-warning/20 text-warning",
        reject: "bg-destructive/20 text-destructive",
        ship: "bg-info/20 text-info",
        deliver: "bg-info/40 text-info",
      };
      const status = row.getValue<string>("order_status");
      const statusStyles = statusColors[status] || "default";
      return (
        <Badge className={cn("rounded-full px-5", statusStyles)}>
          {status}
        </Badge>
      );
    }
  },
  {
    id: "actions",
    accessorKey: "action",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {

      const deleteOrder = (id: any) => {
        return () => {
          toast.success("Order Deleted", {
            description: "Order Deleted Successfully",
            action: (
              <div className="flex justify-end mx-auto items-center my-auto gap-2">
                <Button
                  size="sm"
                  variant="shadow"
                  onClick={() => toast.dismiss()}
                  className="text-white px-3 py-1 rounded-md"
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  variant="shadow"
                  onClick={() => {
                    console.log("deleted order", id);
                    toast.dismiss(); // Dismiss confirmation toast
                    toast("Order deleted", {
                      description: "The order was deleted successfully.",
                    });
                  }}
                  className="text-white px-3 py-1 rounded-md"
                >
                  Confirm
                </Button>
              </div>
            )
          });
        };
      }

      return (
        <div className="flex items-center gap-1">
          <Link
            href={`/dashboard/order-details/${row.original.id}`}
            className="flex items-center p-2 border-b text-warning hover:text-warning-foreground bg-warning/20 hover:bg-warning duration-200 transition-all rounded-full cursor-pointer"
          >
            <Eye className="w-4 h-4" />
          </Link>
          <div
              onClick={deleteOrder(row.original.id)}
              className="flex items-center p-2 text-destructive bg-destructive/40 duration-200 transition-all hover:bg-destructive/80 hover:text-destructive-foreground rounded-full cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
          </div>
        </div>
      );
    },
  },
];
