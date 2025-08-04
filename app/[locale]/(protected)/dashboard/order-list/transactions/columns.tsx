import { ColumnDef } from "@tanstack/react-table";
import {
  Eye,
  Trash2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {Link} from '@/i18n/routing';
import {Orders} from "@/types/orders";
import {formatDateToDMY} from "@/utils";
import Cookies from "js-cookie";
// import ChangeInventoryUserDialog from "@/components/partials/ChangeInventoryUserDialog/ChangeInventoryUserDialog";
// import gettingAllOrders from "@/services/Orders/gettingAllOrders";
import GenerateInvoiceButton from "@/components/partials/GenerateInvoiceButton/GenerateInvoiceButton";

export const baseColumns = ({refresh} : {refresh: () => void}) : ColumnDef<Orders>[] => [
  {
    accessorKey: "orderNumber",
    header: "Code",
    cell: ({ row }) => <span>{row.getValue("orderNumber") || "N/A"}</span>,
  },
  {
    accessorKey: "pharmacyName",
    header: "Pharmacy Name",
    cell: ({ row }) => {
      const name = row.original.pharmacyName;
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
    accessorKey: "inventoryName",
    header: "Inventory Username",
    cell: ({ row }) => {
      const items = row.original.items || [];

      // Get only unique inventory names
      const names = Array.from(
          new Set(
              items
                  .map((item: any) => item.inventoryName)
                  .filter(Boolean) // remove null/undefined
          )
      );

      if (names.length === 0) {
        return <span>N/A</span>;
      }

      const firstTwo = names.slice(0, 2);
      const remaining = names.slice(2);

      return (
          <div className="flex flex-col gap-1">
            {firstTwo.map((name, idx) => (
                <span key={idx}>{name}</span>
            ))}
            {remaining.length > 0 && (
                <span
                    className="text-blue-600 cursor-pointer"
                    title={remaining.join(", ")}
                >
            +{remaining.length} more
          </span>
            )}
          </div>
      );
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
    header: "Order Status",
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
        7: "bg-gray-200 text-gray-700",     // Reassign
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
        7: "Reassigned",
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
  {
    id: "actions",
    accessorKey: "action",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const userRole = Cookies.get("userRole");
      const isAdmin = userRole == "Admin";
      return (
        <div className="flex items-center gap-1">
          {row.original.status === 7 ? (
            <div
              className="flex items-center p-2 text-destructive bg-destructive/20 opacity-50 rounded-full cursor-not-allowed"
              title="Action disabled for reassigned orders"
            >
              <Eye className="w-4 h-4" />
            </div>
          ) : (
            <Link
              href={`/dashboard/order-details/${row.original.id}`}
              className="flex items-center p-2 border-b text-warning hover:text-warning-foreground bg-warning/20 hover:bg-warning duration-200 transition-all rounded-full cursor-pointer"
            >
              <Eye className="w-4 h-4" />
            </Link>
          )}
          {isAdmin && (
              <>
                {row.original.status === 7 ? (
                  <div
                    className="flex items-center p-2 text-destructive bg-destructive/20 opacity-50 rounded-full cursor-not-allowed"
                    title="Action disabled for reassigned orders"
                  >
                    <Trash2 className="w-4 h-4" />
                  </div>
                ) : (
                  <Link
                    href={`/dashboard/remove-item/${row.original.id}`}
                    className="flex items-center p-2 text-destructive bg-destructive/40 duration-200 transition-all hover:bg-destructive/80 hover:text-destructive-foreground rounded-full cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Link>
                )}

                {/*<ChangeInventoryUserDialog*/}
                {/*  orderId={row.original.id}*/}
                {/*  inventoryUserId={row.original.items[0]?.inventoryUserId}*/}
                {/*  onSuccess={() => refresh()}*/}
                {/*/>*/}

                <GenerateInvoiceButton isDisabled={row.original.status == 7} orderId={row.original.id}/>

              </>
          )}
        </div>
      );
    },
  },
];
