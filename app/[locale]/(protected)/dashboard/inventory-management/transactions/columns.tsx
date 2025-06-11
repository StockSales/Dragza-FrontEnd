import {usePathname} from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";
import { SquarePen, Trash2, TriangleAlert } from "lucide-react";
import { Link } from '@/i18n/routing';
import {formatDateToDMY} from "@/utils";
import {Price} from "@/types/price";


export const columns: ColumnDef<Price>[] = [
  {
    accessorKey: "productName",
    header: "Product Name",
    cell: ({ row }) => {
      return (
        <div className="font-medium text-card-foreground/80">
          <div className="flex gap-3 items-center">
            <span className="text-sm text-default-600 whitespace-nowrap">
              {row.getValue("productName")}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "categoryName",
    header: "Category Name",
    cell: ({ row }) => <span>{row.getValue("categoryName")}</span>,
  },
  {
    accessorKey: "purchasePrice",
    header: "Purchase Price",
    cell: ({ row }) => <span>{row.getValue("purchasePrice")}</span>,
  },
  {
    accessorKey: "salesPrice",
    header: "Sales Price",
    cell: ({ row }) => <span>{row.getValue("salesPrice")}</span>,
  },
  {
    header: "Discount (%)",
    cell: ({ row }) => {
      const { salesPrice, purchasePrice } = row.original;
      const discount = ((salesPrice - purchasePrice) / salesPrice) * 100;
      const formattedDiscount = isFinite(discount) ? discount.toFixed(2) : "0.00";
      return <span>{formattedDiscount}%</span>;
    }
  },
  {
    accessorKey: "creationDate",
    header: "Creation Date",
    cell: ({ row }) => {
      return <span>{formatDateToDMY(row.original.creationDate)}</span>;
    },
  },
  {
    accessorKey: "inventoryUserName",
    header: "InventoryUserName",
    cell: ({ row }) => {
      return <span>{row.getValue("inventoryUserName") || "N/A"}</span>;
    },
  },
  // {
  //   accessorKey: "store",
  //   header: "Store",
  //   cell: ({ row }) => {
  //     return <span> {row.getValue("store")}</span>;
  //   },
  // },
  // {
  //   id: "actions",
  //   accessorKey: "action",
  //   header: "Actions",
  //   enableHiding: false,
  //   cell: ({ row }) => {
  //     const pathname = usePathname();
  //     const getHref = () => {
  //       if (pathname?.includes('/sellers')) {
  //         return '/dashboard/edit-product';
  //       } else if (pathname?.includes('/admin')) {
  //         return '/admin/invoice/preview/1';
  //       } else {
  //         return '/utility/invoice/preview/1'; // Default path
  //       }
  //     };
  //     return (
  //       <div className="flex items-center gap-1">
  //         <Link
  //           href={getHref()}
  //           className="flex items-center p-2 border-b text-info hover:text-info-foreground bg-info/40 hover:bg-info duration-200 transition-all rounded-full"
  //         >
  //           <SquarePen className="w-4 h-4" />
  //         </Link>
  //         <Link
  //           href="#"
  //           className="flex items-center p-2 border-b text-warning hover:text-warning-foreground bg-warning/40 hover:bg-warning duration-200 transition-all rounded-full"
  //         >
  //           <TriangleAlert className="w-4 h-4" />
  //         </Link>
  //         <Link
  //           href="#"
  //           className="flex items-center p-2 text-destructive bg-destructive/40 duration-200 transition-all hover:bg-destructive/80 hover:text-destructive-foreground rounded-full"
  //         >
  //           <Trash2 className="w-4 h-4" />
  //         </Link>
  //       </div>
  //     );
  //   },
  // },
];
