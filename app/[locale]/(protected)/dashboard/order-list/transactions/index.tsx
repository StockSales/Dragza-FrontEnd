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
import useVendorOrder from "@/services/Orders/vendor-order";
import { cn } from "@/lib/utils";

// @ts-ignore
export default function TransactionsTable (){
  const userRole = Cookies.get("userRole");
  const isAdmin = userRole == "Admin";
  const userId = Cookies.get("userId");

  // Hooks for different data sources
  const {loading: myOrdersLoading, orders: myOrders, gettingVendorOrders, error: myOrdersError} = useVendorOrder()
  const {gettingAllOrders, orders, loading, error} = useGettingAllOrders();
  const {loading: usersLoading, users: inventoryManagers, getUsersByRoleId} = useGetUsersByRoleId();

  const router = useRouter();

  // Table state
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [filteredOrders, setFilteredOrders] = useState<Orders[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | "all">("all");

  // Create a unified data source
  const allOrdersData = isAdmin ? orders : myOrders;
  const isLoadingData = isAdmin ? loading : myOrdersLoading;

  const columns = baseColumns({
    refresh: () => {
      if (isAdmin) {
        gettingAllOrders();
      } else {
        gettingVendorOrders(userId);
      }
    }
  });

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
    if (!allOrdersData) return;

    if (status === "all") {
      setFilteredOrders(allOrdersData);
    } else {
      const filtered = allOrdersData.filter(order => order.status === status);
      setFilteredOrders(filtered);
    }
  };

  // Load data based on user role
  useEffect(() => {
    if (isAdmin) {
      gettingAllOrders();
    } else {
      if (userId) {
        gettingVendorOrders(userId);
      }
    }
  }, [isAdmin, userId]);

  // Update filtered orders when data changes
  useEffect(() => {
    if (allOrdersData) {
      filterOrdersByStatus(selectedStatus);
    }
  }, [allOrdersData, selectedStatus]);

  return (
      <Card className="w-full">
        <div className="px-5 py-4 flex flex-col 2xl:flex-row items-center gap-4">
          <SearchInput
              data={allOrdersData ?? []}
              setFilteredData={setFilteredOrders}
              filterKey="orderNumber"
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
            <Button
                size="md"
                variant={selectedStatus === OrderStatus.ReAssignTo ? "default" : "ghost"}
                color="default"
                className="ring-0 outline-0 hover:ring-0 hover:ring-offset-0 font-normal border-default-200 rounded-none cursor-pointer"
                onClick={() => filterOrdersByStatus(OrderStatus.ReAssignTo)}
            >
              {OrderStatusLabel[OrderStatus.ReAssignTo]}
            </Button>
          </div>
        </div>

        {(isLoadingData || usersLoading) ? (
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
                              className={cn(
                                row.original.status === 7 && "line-through opacity-60 text-muted-foreground"
                              )}
                            >
                              {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id} className="h-[75px]">
                                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
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