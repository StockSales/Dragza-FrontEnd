"use client";

import * as React from "react";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { columns } from "./columns";
import { Input } from "@/components/ui/input";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import TablePagination from "./table-pagination";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {useRouter} from "@/i18n/routing";
import useGettingAllOrders from "@/services/Orders/gettingAllOrders";
import {useEffect, useState} from "react";
import {Loader2} from "lucide-react";
import {Orders} from "@/types/orders";
import SearchInput from "@/app/[locale]/(protected)/components/SearchInput/SearchInput";

const TransactionsTable = () => {
  // getting all orders
  const {gettingAllOrders, orders, loading, error} = useGettingAllOrders()

  const router = useRouter();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [filteredOrders, setFilteredOrders] = useState<Orders[]>([])

  const table = useReactTable({
    data: filteredOrders ?? [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
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

  // mounted data
  useEffect(() => {
    gettingAllOrders()
  }, []);

  // dependent data
  useEffect(() => {
    if (orders) setFilteredOrders(orders)
  }, [orders]);

  return (
      <Card className="w-full">
        <div className="px-5 py-4">
          <SearchInput
              data={orders ?? []}
              setFilteredData={setFilteredOrders}
              filterKey="id"
          />
        </div>

        {loading == true ? (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
        ) : (
          <CardContent>
            <div className="border border-solid border-default-200 rounded-lg overflow-hidden border-t-0">
              <Table>
                <TableHeader className="bg-default-200">
                  {table.getHeaderGroups().map((headerGroup) => (
                      <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                            <TableHead className="last:text-start" key={header.id}>
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
                          <TableRow
                              key={row.id}
                              data-state={row.getIsSelected() && "selected"}
                          >
                            {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id} className="h-[75px]">
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
                          No results.
                        </TableCell>
                      </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        )}
        <TablePagination table={table} />
      </Card>
  );
};

export default TransactionsTable;