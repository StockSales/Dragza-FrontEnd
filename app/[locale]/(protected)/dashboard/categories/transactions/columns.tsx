"use client";

import { ColumnDef } from "@tanstack/react-table";
import { SquarePen, Trash2 } from "lucide-react";
import { Link } from '@/i18n/routing';
import {usePathname} from "next/navigation";
import {Button} from "@/components/ui/button";
import {toast} from "sonner";
import {CategoryType} from "@/types/category";

export const columns: ColumnDef<CategoryType>[] = [
  {
    accessorKey: "name",
    header: "Category Name",
    cell: ({ row }) => <span>{row.getValue("name")}</span>,
  },
  {
    accessorKey: "pref",
    header: "Pref",
    cell: ({ row }) => <span>{row.getValue("pref")}</span>,
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      return <span>{row.getValue("description")}</span>;
    },
  },
  {
    id: "actions",
    accessorKey: "action",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const id: string | number = row.original.id;
      const pathname: string | null = usePathname();
      const getHref = () => {
        if (pathname?.includes('/categories')) {
          return '/dashboard/edit-category';
        } else {
          return '/dashboard/edit-category';
        }
      };
        const handleDelete = (id: string | number) => {
            const toastId = toast("Delete Category", {
                description: "Are you sure you want to delete this category?",
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
                            className="text-white px-3 py-1 rounded-md"
                            onClick={() => {
                                console.log("deleted category", id);
                                toast.dismiss(toastId); // Dismiss confirmation toast
                                toast("Category deleted", {
                                    description: "The category was deleted successfully.",
                                });
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
              href={`${getHref()}/${id}`}
              className="flex items-center p-2 border-b text-info hover:text-info-foreground bg-info/40 hover:bg-info duration-200 transition-all rounded-full cursor-pointer"
          >
            <SquarePen className="w-4 h-4" />
          </Link>
          <div
            onClick={() => handleDelete(id)}
            className="flex items-center p-2 text-destructive bg-destructive/40 duration-200 transition-all hover:bg-destructive/80 hover:text-destructive-foreground rounded-full cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
          </div>
        </div>
      );
    },
  },
];
