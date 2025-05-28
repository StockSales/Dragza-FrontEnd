import {ColumnDef} from "@tanstack/react-table";
import {ProductType} from "@/types/product";
import Cookies from "js-cookie";
import useDeleteProductById from "@/services/products/deleteProductById";
import {usePathname} from "next/navigation";
import {toast} from "sonner";
import {Button} from "@/components/ui/button";
import {Link} from "@/i18n/routing";
import {SquarePen, Trash2} from "lucide-react";

export const baseColumns = (): ColumnDef<Coupon>[] =>
    [
        {
            accessorKey: "code",
            header: "Code",
            cell: ({ row }) => {
                const code = row.original.code;
                return (
                    <div className="font-medium text-card-foreground/80">
            <span className="text-sm text-default-600">
              {code ?? "N/A"}
            </span>
                    </div>
                );
            },
        },
        {
            accessorKey: "type",
            header: "Type",
            cell: ({ row }) => {
                const type = row.original.type;
                return (
                    <div className="font-medium text-card-foreground/80">
            <span className="text-sm text-default-600">
              {type ?? "N/A"}
            </span>
                    </div>
                );
            },
        },
        // {
        //     accessorKey: "description",
        //     header: "Description",
        //     cell: ({ row }) => {
        //     const description = row.original.description;
        //     return (
        //         <div className="font-medium text-card-foreground/80">
        //             <span className="text-sm text-default-600">
        //             {description ?? "N/A"}
        //             </span>
        //         </div>
        //     );
        //     },
        // },
        {
            accessorKey: "numberOfUsers",
            header: "Number of Users",
            cell: ({ row }) => <span>{row.original.numberOfUsers}</span>,
        },
        {
            accessorKey: "value",
            header: "value",
            cell: ({ row }) => <span>{row.original.value || "N/A"}</span>,
        },
        {
          accessorKey: "startDate",
          header: "Start Date",
          cell: ({ row }) => <span>{row.getValue("startDate")}</span>,
        },
        {
          accessorKey: "endDate",
          header: "End Date",
          cell: ({ row }) => {
            return <span>{row.getValue("endDate")}</span>;
          },
        },
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
                const getHref = () => {
                    const id = row.original.id;
                    return `/dashboard/edit-coupon/${id}`;
                };

                const handleDelete = (id: string | number | undefined) => {
                    if (!id) return;
                    // TODO: handle delete here
                    toast.success("Coupon Deleted", {
                        description: "Coupon Deleted Successfully"
                    })
                    setTimeout(() => {
                        toast.dismiss();
                    }, 2000);
                };

                return (
                    <div className="flex items-center gap-1">
                        <Link
                            href={getHref()}
                            className="flex items-center p-2 border-b text-info hover:text-info-foreground bg-info/40 hover:bg-info duration-200 transition-all rounded-full"
                        >
                            <SquarePen className="w-4 h-4" />
                        </Link>
                        <div
                            className="flex items-center p-2 text-destructive bg-destructive/40 duration-200 transition-all hover:bg-destructive/80 hover:text-destructive-foreground rounded-full cursor-pointer"
                            onClick={() => {
                                const id = row.original.id;
                                handleDelete(id);
                            }}
                        >
                            <Trash2 className="w-4 h-4" />
                        </div>
                    </div>
                );
            },
        },
    ];