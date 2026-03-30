"use client";

import * as React from "react";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { baseColumns } from "./columns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CardContent } from "@/components/ui/card";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import useGettingAllProducts from "@/services/products/gettingAllProducts";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import GetCategories from "@/services/categories/getCategories";
import Cookies from "js-cookie";
import { useTranslations } from "next-intl";
import ExcelUploadButton from "@/app/[locale]/(protected)/dashboard/add-product-byExcel/ExcelUploadButton";

const TransactionsTable = () => {
  const t = useTranslations("productList");
  const userRole = Cookies.get("userRole");
  const userId = Cookies.get("userId");

  const {
    loading,
    getAllProducts,
    products: data,
    error,
    includeDeleted,
    totalItems,
    totalPages: apiTotalPages,
    currentPage,
    setCurrentPage,
  } = useGettingAllProducts();

  const {
    loading: categoriesLoading,
    gettingAllCategories,
  } = GetCategories();

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  // ✅ search state
  const [searchValue, setSearchValue] = useState("");

  const columns = baseColumns({
    refresh: () =>
      getAllProducts(includeDeleted, currentPage, 50, searchValue),
    t,
  });

  const table = useReactTable({
    data: data ?? [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  useEffect(() => {
    gettingAllCategories();
  }, []);

  // ✅ debounce + search + pagination
  useEffect(() => {
    const delay = setTimeout(() => {
      getAllProducts(includeDeleted, currentPage, 50, searchValue);
    }, 500);

    return () => clearTimeout(delay);
  }, [includeDeleted, currentPage, searchValue]);

  if (categoriesLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  if (error) {
    toast.error("Something went wrong", {
      description: error,
    });
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex justify-between flex-row items-center py-4 px-6 border-b border-solid border-default-200">
        <div className="flex items-center gap-4 w-full flex-wrap justify-between">
          
          {/* ✅ Search Input */}
          <input
            type="text"
            placeholder="Search products..."
            className="border px-3 py-2 rounded-md w-[250px]"
            value={searchValue}
            onChange={(e) => {
              setCurrentPage(1); // 🔥 مهم
              setSearchValue(e.target.value);
            }}
          />

          {userRole == "Admin" && (
            <div className="flex items-center gap-3">
              <Link href="/dashboard/add-product">
                <Button size={"md"} variant="outline" color="secondary">
                  {t("addProduct")}
                </Button>
              </Link>

              <ExcelUploadButton
                onSuccess={() => {
                  getAllProducts(
                    includeDeleted,
                    currentPage,
                    50,
                    searchValue
                  );
                  toast.success(
                    t("dataRefreshed") || "Product list refreshed"
                  );
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <Loader2 className="w-6 h-6 animate-spin" />
        </div>
      ) : (
        <>
          {/* Table */}
          <CardContent className="pt-6">
            <div className="border border-solid border-default-200 rounded-lg overflow-hidden border-t-0">
              <Table>
                <TableHeader className="bg-default-200">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>

                <TableBody>
                  {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className="h-24 text-center"
                      >
                        {t("noProductsFound")}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>

          {/* ✅ Pagination */}
          <div className="flex items-center justify-center gap-4 py-4">
            <Button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              Prev
            </Button>

            <span>
              Page {currentPage} of {apiTotalPages}
            </span>

            <Button
              disabled={currentPage === apiTotalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Next
            </Button>
          </div>

          {/* Info */}
          <div className="text-center text-sm text-muted-foreground pb-4">
            {t("totalProducts") || "Total products"}: {totalItems} |{" "}
            {t("totalPages") || "Total pages"}: {apiTotalPages}
          </div>
        </>
      )}
    </div>
  );
};

export default TransactionsTable;