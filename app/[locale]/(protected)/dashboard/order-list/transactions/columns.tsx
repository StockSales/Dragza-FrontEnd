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
import {Orders} from "@/types/orders";
import {formatDateToDMY} from "@/utils";

export const columns: ColumnDef<Orders>[] = [
  {
    accessorKey: "id",
    header: "Order",
    cell: ({ row }) => <span>{row.getValue("id")}</span>,
  },
  {
    accessorKey: "pharmacyUserId",
    header: "Pharmacy Name",
    cell: ({ row }) => {
      const name = row.original.pharmacyUserId;
      return (
        <div className="font-medium text-card-foreground/80">
          <span className="text-sm text-default-600 whitespace-nowrap">
            {name ?? "Unknown User"}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "inventoryUserId",
    header: "Inventory Username",
    cell: ({ row }) => {
      return <span>{row.getValue("inventoryUserId")}</span>;
    },
  },
  {
    accessorKey: "orderDate",
    header: "Order Date",
    cell: ({ row }) => {
      return <span>{formatDateToDMY(row.original.orderDate)}</span>;
    },
  },
  {
    accessorKey: "totalAmount",
    header: "Order Cost",
    cell: ({ row }) => {
      return <span>{row.getValue("totalAmount")}</span>;
    },
  },
  {
    accessorKey: "status",
    header: "Payment Status",
    cell: ({ row }) => {
      // Map status numbers to class names
      const statusColors: Record<number, string> = {
        0: "bg-yellow-200 text-yellow-700", // Pending
        1: "bg-blue-200 text-blue-700",     // Approved
        2: "bg-red-200 text-red-700",       // Rejected
        3: "bg-purple-200 text-purple-700", // Prepared
        4: "bg-indigo-200 text-indigo-700", // Shipped
        5: "bg-green-200 text-green-700",   // Delivered
        6: "bg-emerald-200 text-emerald-700", // Completed
      };

      // Map status numbers to display names
      const statusLabels: Record<number, string> = {
        0: "Pending",
        1: "Approved",
        2: "Rejected",
        3: "Prepared",
        4: "Shipped",
        5: "Delivered",
        6: "Completed",
      };

      const status = row.getValue<number>("status");
      const statusStyle = statusColors[status] || "bg-gray-200 text-gray-700";
      const statusLabel = statusLabels[status] || "Unknown";

      return (
          <Badge className={cn("rounded-full px-5 py-1 text-sm", statusStyle)}>
            {statusLabel}
          </Badge>
      );
    },
  },
  // {
  //   accessorKey: "order_status",
  //   header: "Order Status",
  //   cell: ({ row }) => {
  //     const statusColors: Record<string, string> = {
  //       approve: "bg-success/20 text-success",
  //       complete: "bg-success/40 text-success",
  //       prepare: "bg-warning/20 text-warning",
  //       reject: "bg-destructive/20 text-destructive",
  //       ship: "bg-info/20 text-info",
  //       deliver: "bg-info/40 text-info",
  //     };
  //     const status = row.getValue<string>("order_status");
  //     const statusStyles = statusColors[status] || "default";
  //     return (
  //       <Badge className={cn("rounded-full px-5", statusStyles)}>
  //         {status}
  //       </Badge>
  //     );
  //   }
  // },
  // {
  //   id: "actions",
  //   accessorKey: "action",
  //   header: "Actions",
  //   enableHiding: false,
  //   cell: ({ row }) => {
  //
  //     const deleteOrder = (id: any) => {
  //       return () => {
  //         toast.success("Order Deleted", {
  //           description: "Order Deleted Successfully",
  //           action: (
  //             <div className="flex justify-end mx-auto items-center my-auto gap-2">
  //               <Button
  //                 size="sm"
  //                 variant="shadow"
  //                 onClick={() => toast.dismiss()}
  //                 className="text-white px-3 py-1 rounded-md"
  //               >
  //                 Cancel
  //               </Button>
  //               <Button
  //                 size="sm"
  //                 variant="shadow"
  //                 onClick={() => {
  //                   console.log("deleted order", id);
  //                   toast.dismiss(); // Dismiss confirmation toast
  //                   toast("Order deleted", {
  //                     description: "The order was deleted successfully.",
  //                   });
  //                 }}
  //                 className="text-white px-3 py-1 rounded-md"
  //               >
  //                 Confirm
  //               </Button>
  //             </div>
  //           )
  //         });
  //       };
  //     }
  //
  //     return (
  //       <div className="flex items-center gap-1">
  //         <Link
  //           href={`/dashboard/order-details/${row.original.id}`}
  //           className="flex items-center p-2 border-b text-warning hover:text-warning-foreground bg-warning/20 hover:bg-warning duration-200 transition-all rounded-full cursor-pointer"
  //         >
  //           <Eye className="w-4 h-4" />
  //         </Link>
  //         <div
  //             onClick={deleteOrder(row.original.id)}
  //             className="flex items-center p-2 text-destructive bg-destructive/40 duration-200 transition-all hover:bg-destructive/80 hover:text-destructive-foreground rounded-full cursor-pointer"
  //         >
  //           <Trash2 className="w-4 h-4" />
  //         </div>
  //       </div>
  //     );
  //   },
  // },
];
