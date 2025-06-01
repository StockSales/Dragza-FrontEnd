import { ColumnDef } from "@tanstack/react-table";
import {formatDateToDMY} from "@/utils";
import {Area} from "@/types/areas";


export const columns: ColumnDef<Area>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return (
        <div className="font-medium text-card-foreground/80">
          <div className="flex gap-3 items-center">
            <span className="text-sm text-default-600 whitespace-nowrap">
              {row.getValue("name")}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => <span>{row.getValue("description")}</span>,
  },
  {
    accessorKey: "establishedDate",
    header: "establishedDate",
    cell: ({ row }) => <span>{row.getValue("establishedDate")}</span>,
  },
  {
    accessorKey: "isActive",
    header: "Is Active",
    cell: ({ row }) => {
      const isActive = row.getValue("isActive");
      const label = isActive ? "Active" : "Inactive";
      const badgeColor = isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";

      return (
          <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${badgeColor}`}
          >
        {label}
      </span>
      );
    },
  },
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
