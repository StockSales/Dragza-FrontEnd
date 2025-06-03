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
import {baseColumns} from "./columns";
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
import { Card, CardContent } from "@/components/ui/card";
import {useRouter} from "@/i18n/routing";
import useGettingAllOrders from "@/services/Orders/gettingAllOrders";
import {useEffect, useState} from "react";
import {Loader2} from "lucide-react";
import {Orders} from "@/types/orders";
import SearchInput from "@/app/[locale]/(protected)/components/SearchInput/SearchInput";
import useGetUsersByRoleId from "@/services/users/GetUsersByRoleId";
import Cookies from "js-cookie";
import useGettingMyOrders from "@/services/Orders/gettingMyOrders";

// @ts-ignore
export default function TransactionsTable (){
  const userRole = Cookies.get("userRole");
  const isAdmin = userRole == "Admin";

  const {loading: myOrdersLoading, orders: myOrders, gettingMyOrders, error: myOrdersError} = useGettingMyOrders()

  const {
    gettingAllOrders,
    orders,
    loading,
    error
  } = useGettingAllOrders();

  const {
    loading: usersLoading,
    users: inventoryManagers,
    getUsersByRoleId
  } = useGetUsersByRoleId();

  const router = useRouter();

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [filteredOrders, setFilteredOrders] = useState<Orders[]>([]);
  const [selectedManagerId, setSelectedManagerId] = useState<string | null>(null);

  const columns = baseColumns({ refresh: () => gettingAllOrders() });

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

  // Load inventory managers once on mount
  useEffect(() => {
    if (isAdmin){
      // getUsersByRoleId("1A5A84FB-23C3-4F9B-A122-4C5BC6C5CB2D");
      gettingAllOrders(); // Make sure this function accepts manager ID
    } else {
      gettingMyOrders();
    }
  }, []);

  // Sync filteredOrders when orders are updated
  useEffect(() => {
    if (orders || myOrders) setFilteredOrders(orders || myOrders);
  }, [orders, myOrders]);

  return (
      <Card className="w-full">
        <div className="px-5 py-4 flex items-center gap-4">
          <SearchInput
              data={orders ?? []}
              setFilteredData={setFilteredOrders}
              filterKey="id"
          />
        </div>

        {(loading || usersLoading || myOrdersLoading) ? (
            <div className="flex items-center justify-center h-full py-8">
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
                        <>
                          {orders.length === 0 && (
                            <TableRow>
                              <TableCell
                                  colSpan={columns.length}
                                  className="h-24 text-center"
                              >
                                No results.
                              </TableCell>
                            </TableRow>
                          )}
                        </>
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