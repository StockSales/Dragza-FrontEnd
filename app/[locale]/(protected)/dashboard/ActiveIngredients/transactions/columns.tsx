import { ColumnDef } from "@tanstack/react-table";
import { SquarePen, Trash2 } from "lucide-react";
import { Link } from '@/i18n/routing';
import {usePathname} from "next/navigation";
import {toast} from "sonner";
import {Button} from "@/components/ui/button";
import Cookies from "js-cookie";
import {ActiveIngredient} from "@/types/activeIngredient";
import useDeleteActiveIngredientById from "@/services/ActiveIngerients/deleteActiveIngredientById";

export const baseColumns = ({ refresh }: { refresh: () => void }): ColumnDef<ActiveIngredient>[] =>
[
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const product = row.original.name;
      return (
        <div className="font-medium text-card-foreground/80">
            <span className="text-sm text-default-600">
              {product ?? "Unknown Product"}
            </span>
        </div>
      );
    },
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
        const userRole = Cookies.get("userRole");
        const { loading, deleteActiveIngredientById} = useDeleteActiveIngredientById()
      const pathname = usePathname();
      const getHref = () => {
        if (pathname?.includes('/ActiveIngredient') && userRole == 'Admin') {
          return `/dashboard/edit-ActiveIngredient/${row.original.id}`;
        }
        return `/dashboard/edit-ActiveIngredient/${row.original.id}`
      };

        const handleDeleteActiveIngredient = (id: string | undefined) => {
            const toastId = toast("Delete ActiveIngredient", {
                description: "Are you sure you want to delete this Active Ingredient?",
                action: (
                    <div className="flex justify-end mx-auto items-center my-auto gap-2">
                        <Button
                            size="sm"
                            onClick={() => toast.dismiss(toastId)}
                            className="text-white px-3 py-1 rounded-md"
                        >
                            Cancel
                        </Button>
                        <Button
                            size="sm"
                            variant="shadow"
                            disabled={loading} // Make sure you define loading state
                            className="text-white px-3 py-1 rounded-md"
                            onClick={async () => {
                                try {
                                    const {success, error} = await deleteActiveIngredientById(id as string);
                                    toast.dismiss(toastId);
                                    if (success) {
                                        toast("Active Ingredient deleted", {
                                            description: "The Active Ingredient was deleted successfully.",
                                        });
                                        refresh();
                                    } else {
                                        throw new Error(error);
                                    }
                                } catch (error) {
                                    toast.dismiss(toastId);
                                    toast("Error", {
                                        description: (error as Error).message,
                                    });
                                }
                            }}
                        >
                            Confirm
                        </Button>
                    </div>
                ),
            });
        };
        return (
        <div className="flex items-center gap-1">
          <Link
            href={getHref()}
            className="flex items-center p-2 border-b text-info hover:text-info-foreground bg-info/40 hover:bg-info duration-200 transition-all rounded-full"
          >
            <SquarePen className="w-4 h-4" />
          </Link>
            {userRole == "Admin" && (
              <div
                onClick={() => handleDeleteActiveIngredient(row.original.id as string)}
                className="flex items-center p-2 text-destructive bg-destructive/40 duration-200 transition-all hover:bg-destructive/80 hover:text-destructive-foreground rounded-full"
              >
                <Trash2 className="w-4 h-4" />
              </div>
            )}
        </div>
      );
    },
  },
];
