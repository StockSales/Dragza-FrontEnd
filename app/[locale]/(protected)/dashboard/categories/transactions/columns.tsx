import { ColumnDef } from "@tanstack/react-table";
import { SquarePen, Trash2 } from "lucide-react";
import { Link } from '@/i18n/routing';
import {usePathname} from "next/navigation";

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
  pref: string;
  disc: string;
  isAvailable: boolean;
  published: boolean;
  action: React.ReactNode;
};

export const columns: ColumnDef<DataProps>[] = [
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <span>{row.getValue("category")}</span>,
  },
  {
    accessorKey: "pref",
    header: "Pref",
    cell: ({ row }) => <span>{row.getValue("pref")}</span>,
  },
  {
    accessorKey: "disc",
    header: "Discription",
    cell: ({ row }) => {
      return <span>{row.getValue("disc")}</span>;
    },
  },
  {
    id: "actions",
    accessorKey: "action",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const pathname = usePathname();
      const getHref = () => {
        if (pathname?.includes('/categories')) {
          return '/dashboard/edit-category';
        } else {
          return '/dashboard/edit-category';
        }
      };
      return (
        <div className="flex items-center gap-1">
          <Link
            href={getHref()}
            className="flex items-center p-2 border-b text-info hover:text-info-foreground bg-info/40 hover:bg-info duration-200 transition-all rounded-full cursor-pointer"
          >
            <SquarePen className="w-4 h-4" />
          </Link>
          <div
              onClick={() => console.log('delete')}
            className="flex items-center p-2 text-destructive bg-destructive/40 duration-200 transition-all hover:bg-destructive/80 hover:text-destructive-foreground rounded-full cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
          </div>
        </div>
      );
    },
  },
];
