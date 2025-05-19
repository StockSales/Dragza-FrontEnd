import { ColumnDef } from "@tanstack/react-table";
import { SquarePen, Trash2 } from "lucide-react";
import { Link } from '@/i18n/routing';
import Image from "next/image";
import {usePathname} from "next/navigation";
import {Badge} from "@/components/ui/badge";
import {cn} from "@/lib/utils";
import {ProductType} from "@/types/product";

export const columns: ColumnDef<ProductType>[] = [
  {
    accessorKey: "name",
    header: "Product",
    cell: ({ row }) => {
      const product = row.original.name;
      return (
        <div className="font-medium text-card-foreground/80">
            <span className="text-sm text-default-600">
              {name ?? "Unknown User"}
            </span>
        </div>
      );
    },
  },
  {
    accessorKey: "preef",
    header: "Pref",
    cell: ({ row }) => {
      const pref = row.original.preef;
      return (
        <div className="font-medium text-card-foreground/80">
            <span className="text-sm text-default-600">
              {pref ?? "N/A"}
            </span>
        </div>
      );
    },
  },
  {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => {
      const description = row.original.description;
      return (
          <div className="font-medium text-card-foreground/80">
              <span className="text-sm text-default-600">
              {description ?? "N/A"}
              </span>
          </div>
      );
      },
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <span>{row.original.category.name}</span>,
  },
    {
    accessorKey: "activeIngredient",
    header: "Active Ingredient",
    cell: ({ row }) => <span>{row.original.activeIngredient}</span>,
  },
  // {
  //   accessorKey: "stock",
  //   header: "Stock",
  //   cell: ({ row }) => <span>{row.getValue("stock")}</span>,
  // },
  // {
  //   accessorKey: "seller",
  //   header: "Seller",
  //   cell: ({ row }) => {
  //     return <span>{row.getValue("seller")}</span>;
  //   },
  // },
  // {
  //   accessorKey: "basePrice",
  //   header: "Selling Price",
  //   cell: ({ row }) => {
  //     const info = row.original.info;
  //     return <span>{info.basePrice}</span>;
  //   }
  // },
  // {
  //   accessorKey: "purchasePrice",
  //   header: "Purchase Price",
  //   cell: ({ row }) => {
  //     const info = row.original.info;
  //     return <span>{info.purchasePrice}</span>;
  //   }
  // },
  // {
  //   accessorKey: "isAvailable",
  //   header: "Availability",
  //   cell: ({ row }) => {
  //     const Colors: Record<string, string> = {
  //       true: "bg-success/20 text-success",
  //       false: "bg-destructive/20 text-destructive text-center",
  //     };
  //     const isAvailable = row?.original.isAvailable;
  //     const statusStyles = Colors[`${isAvailable}`] || "default";
  //     return (
  //         <Badge className={cn("rounded-full px-5", statusStyles)}>
  //           {isAvailable === true ? "Available" : "Not Available"}{" "}
  //         </Badge>
  //     );
  //   },
  // },
  // {
  //   accessorKey: "published",
  //   header: "Published",
  //   cell: ({ row }) => {
  //     const published = row.original.published;
  //     return <Switch color="success" />;
  //   },
  // },
  {
    id: "actions",
    accessorKey: "action",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const pathname = usePathname();
      const getHref = () => {
        if (pathname?.includes('/product-list')) {
          return `/dashboard/edit-product/${row.original.id}`;
        }
        return `/dashboard/edit-product/${row.original.id}`
      };
      return (
        <div className="flex items-center gap-1">
          <Link
            href={getHref()}
            className="flex items-center p-2 border-b text-info hover:text-info-foreground bg-info/40 hover:bg-info duration-200 transition-all rounded-full"
          >
            <SquarePen className="w-4 h-4" />
          </Link>
          <Link
            href="#"
            className="flex items-center p-2 text-destructive bg-destructive/40 duration-200 transition-all hover:bg-destructive/80 hover:text-destructive-foreground rounded-full"
          >
            <Trash2 className="w-4 h-4" />
          </Link>
        </div>
      );
    },
  },
];
