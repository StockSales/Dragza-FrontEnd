import { ColumnDef } from "@tanstack/react-table";
import { SquarePen, Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from '@/i18n/routing';
import { Switch } from "@/components/ui/switch";
import Image from "next/image";
import {usePathname} from "next/navigation";
import {Badge} from "@/components/ui/badge";
import {cn} from "@/lib/utils";

export type DataProps = {
  id: string | number;
  product: {
    name: string;
    image: string;
  };
  category: string;
  seller: string;
  stock: number;
  info: {
    soldItems: number;
    basePrice: string;
    purchasePrice: string;
    ratings: number;
  };
  isAvailable: boolean;
  published: boolean;
  action: React.ReactNode;
};

export const columns: ColumnDef<DataProps>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="bg-default-100"
      />
    ),
    cell: ({ row }) => (
      <div className="xl:w-16">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="bg-default-100"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "product",
    header: "Product",
    cell: ({ row }) => {
      const product = row.original.product;
      return (
        <div className="font-medium text-card-foreground/80">
          <div className="flex gap-3 items-center">
            <Image
              src={product.image}
              alt=""
              height={32}
              width={32}
              className=" w-8 h-8"
            />

            <span className="text-sm text-default-600">
              {product?.name ?? "Unknown User"}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <span>{row.getValue("category")}</span>,
  },
  {
    accessorKey: "stock",
    header: "Stock",
    cell: ({ row }) => <span>{row.getValue("stock")}</span>,
  },
  {
    accessorKey: "seller",
    header: "Seller",
    cell: ({ row }) => {
      return <span>{row.getValue("seller")}</span>;
    },
  },
  {
    accessorKey: "basePrice",
    header: "Selling Price",
    cell: ({ row }) => {
      const info = row.original.info;
      return <span>{info.basePrice}</span>;
    }
  },
  {
    accessorKey: "purchasePrice",
    header: "Purchase Price",
    cell: ({ row }) => {
      const info = row.original.info;
      return <span>{info.purchasePrice}</span>;
    }
  },
  {
    accessorKey: "isAvailable",
    header: "Availability",
    cell: ({ row }) => {
      const Colors: Record<string, string> = {
        true: "bg-success/20 text-success",
        false: "bg-destructive/20 text-destructive text-center",
      };
      const isAvailable = row?.original.isAvailable;
      const statusStyles = Colors[`${isAvailable}`] || "default";
      return (
          <Badge className={cn("rounded-full px-5", statusStyles)}>
            {isAvailable === true ? "Available" : "Not Available"}{" "}
          </Badge>
      );
    },
  },
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
          return '/dashboard/edit-product';
        } else {
          return '/utility/invoice/preview/1'; // Default path
        }
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
