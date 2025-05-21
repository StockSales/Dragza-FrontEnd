import { ColumnDef } from "@tanstack/react-table";
import { SquarePen, Trash2 } from "lucide-react";
import { Link } from '@/i18n/routing';
import {usePathname} from "next/navigation";
import {ProductType} from "@/types/product";
import {toast} from "sonner";
import useDeleteProductById from "@/services/products/deleteProductById";
import {Button} from "@/components/ui/button";
import Cookies from "js-cookie";

export const columns: ColumnDef<ProductType>[] = [
  {
    accessorKey: "name",
    header: "Product",
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
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <span>{row.original.category.name}</span>,
  },
    {
    accessorKey: "activeIngredient",
    header: "Active Ingredient",
    cell: ({ row }) => <span>{row.original.activeIngredient || "N/A"}</span>,
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
        const { loading, deleteProductById, isDeleted, error} = useDeleteProductById()
      const pathname = usePathname();
      const getHref = () => {
        if (pathname?.includes('/product-list') && userRole == 'Admin') {
          return `/dashboard/edit-product/${row.original.id}`;
        } else if( pathname?.includes('/product-list') && userRole == 'Inventory') {
            return `/dashboard/add-product-price/${row.original.id}`;
        }
        return `/dashboard/edit-product/${row.original.id}`
      };

        const handleDeleteProduct = (id: string | undefined) => {
            const toastId = toast("Delete Product", {
                description: "Are you sure you want to delete this product?",
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
                                    await deleteProductById(id);
                                    toast.dismiss(toastId);
                                    if (isDeleted) {
                                        toast("Product deleted", {
                                            description: "The product was deleted successfully.",
                                        });
                                    } else if (error) {
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
                onClick={() => handleDeleteProduct(row.original.id)}
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
