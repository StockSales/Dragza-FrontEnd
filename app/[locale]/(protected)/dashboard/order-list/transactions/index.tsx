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
import {Button} from "@/components/ui/button";
import {OrderStatus, OrderStatusLabel} from "@/enum";

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
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | "all">("all");

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

  // Filter orders based on selected status
  const filterOrdersByStatus = (status: OrderStatus | "all") => {
    setSelectedStatus(status);
    if (status === "all") {
      setFilteredOrders(orders || myOrders || []);
    } else {
      const filtered = (orders || myOrders || []).filter(order => order.status === status);
      setFilteredOrders(filtered);
    }
  };

  // Load inventory managers once on mount
  useEffect(() => {
    if (isAdmin){
      // getUsersByRoleId("1A5A84FB-23C3-4F9B-A122-4C5BC6C5CB2D");
      gettingAllOrders();
    } else {
      gettingMyOrders();
    }
  }, []);

  // Sync filteredOrders when orders are updated
  useEffect(() => {
    filterOrdersByStatus(selectedStatus);
  }, [orders, myOrders]);

  return (
      <Card className="w-full">
        <div className="px-5 py-4 flex items-center gap-4">
          <SearchInput
              data={orders ?? []}
              setFilteredData={setFilteredOrders}
              filterKey="id"
          />

          <div className="inline-flex flex-wrap items-center border border-solid divide-x divide-default-200 divide-solid rounded-md overflow-hidden">
            <Button
                size="md"
                variant={selectedStatus === "all" ? "default" : "ghost"}
                color="default"
                className="ring-0 outline-0 hover:ring-0 hover:ring-offset-0 font-normal border-default-200 rounded-none cursor-pointer"
                onClick={() => filterOrdersByStatus("all")}
            >
              All
            </Button>

            <Button
                size="md"
                variant={selectedStatus === OrderStatus.Pending ? "default" : "ghost"}
                color="default"
                className="ring-0 outline-0 hover:ring-0 hover:ring-offset-0 font-normal border-default-200 rounded-none cursor-pointer"
                onClick={() => filterOrdersByStatus(OrderStatus.Pending)}
            >
              {OrderStatusLabel[OrderStatus.Pending]}
            </Button>

            <Button
                size="md"
                variant={selectedStatus === OrderStatus.Approved ? "default" : "ghost"}
                color="default"
                className="ring-0 outline-0 hover:ring-0 hover:ring-offset-0 font-normal border-default-200 rounded-none cursor-pointer"
                onClick={() => filterOrdersByStatus(OrderStatus.Approved)}
            >
              {OrderStatusLabel[OrderStatus.Approved]}
            </Button>

            <Button
                size="md"
                variant={selectedStatus === OrderStatus.Rejected ? "default" : "ghost"}
                color="default"
                className="ring-0 outline-0 hover:ring-0 hover:ring-offset-0 font-normal border-default-200 rounded-none cursor-pointer"
                onClick={() => filterOrdersByStatus(OrderStatus.Rejected)}
            >
              {OrderStatusLabel[OrderStatus.Rejected]}
            </Button>

            <Button
                size="md"
                variant={selectedStatus === OrderStatus.Prepared ? "default" : "ghost"}
                color="default"
                className="ring-0 outline-0 hover:ring-0 hover:ring-offset-0 font-normal border-default-200 rounded-none cursor-pointer"
                onClick={() => filterOrdersByStatus(OrderStatus.Prepared)}
            >
              {OrderStatusLabel[OrderStatus.Prepared]}
            </Button>

            <Button
                size="md"
                variant={selectedStatus === OrderStatus.Shipped ? "default" : "ghost"}
                color="default"
                className="ring-0 outline-0 hover:ring-0 hover:ring-offset-0 font-normal border-default-200 rounded-none cursor-pointer"
                onClick={() => filterOrdersByStatus(OrderStatus.Shipped)}
            >
              {OrderStatusLabel[OrderStatus.Shipped]}
            </Button>

            <Button
                size="md"
                variant={selectedStatus === OrderStatus?.Delivered ? "default" : "ghost"}
                color="default"
                className="ring-0 outline-0 hover:ring-0 hover:ring-offset-0 font-normal border-default-200 rounded-none cursor-pointer"
                onClick={() => filterOrdersByStatus(OrderStatus.Delivered)}
            >
              {OrderStatusLabel[OrderStatus.Delivered]}
            </Button>

            <Button
                size="md"
                variant={selectedStatus === OrderStatus.Completed ? "default" : "ghost"}
                color="default"
                className="ring-0 outline-0 hover:ring-0 hover:ring-offset-0 font-normal border-default-200 rounded-none cursor-pointer"
                onClick={() => filterOrdersByStatus(OrderStatus.Completed)}
            >
              {OrderStatusLabel[OrderStatus.Completed]}
            </Button>
          </div>
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