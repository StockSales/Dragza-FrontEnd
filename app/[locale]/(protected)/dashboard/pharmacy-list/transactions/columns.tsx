import { ColumnDef } from "@tanstack/react-table";
import { SquarePen, Trash2, TriangleAlert } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from '@/i18n/routing';
import { Badge } from "@/components/ui/badge";

export type DataProps = {
  id: string | number;
  phone: string;
  userName: string;
  date: string;
  email: string;
  amount: string;
  rating: number;
  action: React.ReactNode;
  isPharmacy: boolean;
  pharmacyDetails: {
    arabicName: string;
    englishName: string;
    phoneNumber: string;
  }
};
export const columns: ColumnDef<DataProps>[] = [
  {
    accessorKey: "userName",
    header: "UserName",
    cell: ({ row }) => {
      const user = row.original.userName;
      return (
        <div className="font-medium text-card-foreground/80">
          <div className="flex gap-3 items-center">
            <span className="text-sm text-default-600 whitespace-nowrap">
              {user ?? "Unknown User"}
            </span>
          </div>
        </div>
      );
    },
  },
  // {
  //   accessorKey: "phone",
  //   header: "Phone",
  //   cell: ({ row }) => <span>{row.getValue("phone")}</span>,
  // },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <span>{row.getValue("email")}</span>,
  },
  {
    accessorKey: "pharmacyDetails",
    header: "Arabic Name",
    cell: ({ row }) => {
      return <span> {row.original?.pharmacyDetails?.arabicName || "N/A"}</span>;
    },
  },
  {
    accessorKey: "pharmacyDetails",
    header: "English Name",
    cell: ({ row }) => {
      return <span> {row.original?.pharmacyDetails?.englishName || "N/A"}</span>;
    },
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
    cell: ({ row }) => {
      return <span> {row.original?.pharmacyDetails?.phoneNumber || "N/A"}</span>;
    },
  },
  {
    accessorKey: "area",
    header: "Area",
    cell: ({ row }) => {
      return <span>{"Location"}</span>;
    },
  },
  // {
  //   id: "actions",
  //   accessorKey: "action",
  //   header: "Actions",
  //   enableHiding: false,
  //   cell: ({ row }) => {
  //     return (
  //       <div className="flex items-center gap-1">
  //         {/*<Link*/}
  //         {/*  href="/utility/invoice/preview/1"*/}
  //         {/*  className="flex items-center p-2 border-b text-info hover:text-info-foreground bg-info/20 hover:bg-info duration-200 transition-all rounded-full"*/}
  //         {/*>*/}
  //         {/*  <SquarePen className="w-4 h-4" />*/}
  //         {/*</Link>*/}
  //         <div
  //           className="flex items-center p-2 text-destructive bg-destructive/40 duration-200 transition-all hover:bg-destructive/80 hover:text-destructive-foreground rounded-full"
  //         >
  //           <Trash2 className="w-4 h-4" />
  //         </div>
  //       </div>
  //     );
  //   },
  // },
];
