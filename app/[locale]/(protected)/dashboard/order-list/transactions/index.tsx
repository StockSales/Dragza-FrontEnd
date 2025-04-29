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

import { data } from "./data";
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

const TransactionsTable = () => {
  const router = useRouter();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [filteredData, setFilteredData] = React.useState(data);

  // filtering order data for table
  const filteringOrders = (filter: string) => {
    if (filter === "all") {
      setFilteredData(data);
    } else {
      const newData = data.filter((item) => item.order_status === filter);
      setFilteredData(newData);
    }
  };

  const table = useReactTable({
    data: filteredData,
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

  return (
      <Card className="w-full">
        <div className="flex flex-wrap gap-4 items-center py-4 px-5">
          <div className="flex-1 text-xl flex flex-wrap gap-4 justify-end font-medium text-default-900">
            <div className="inline-flex flex-wrap items-center border border-solid divide-x divide-default-200 divide-solid rounded-md overflow-hidden">
              <Button
                  size="md"
                  variant="ghost"
                  color="default"
                  className="ring-0 outline-0 hover:ring-0 hover:ring-offset-0 font-normal border-default-200 rounded-none cursor-pointer"
                  onClick={() => filteringOrders("all")}
              >
                All
              </Button>

              <Button
                  size="md"
                  variant="ghost"
                  color="default"
                  className="ring-0 outline-0 hover:ring-0 hover:ring-offset-0 font-normal border-default-200 rounded-none cursor-pointer"
                  onClick={() => filteringOrders("accepted")}
              >
                Accepted
              </Button>

              <Button
                  size="md"
                  variant="ghost"
                  color="default"
                  className="ring-0 outline-0 hover:ring-0 hover:ring-offset-0 font-normal border-default-200 rounded-none cursor-pointer"
                  onClick={() => filteringOrders("pending")}
              >
                Pending
              </Button>

              <Button
                  size="md"
                  variant="ghost"
                  color="default"
                  className="ring-0 outline-0 hover:ring-0 hover:ring-offset-0 font-normal border-default-200 rounded-none cursor-pointer"
                  onClick={() => filteringOrders("rejected")}
              >
                Rejected
              </Button>
            </div>
          </div>
          <Button
            variant="shadow"
            size="md"
            className="flex items-center gap-2"
            onClick={() => router.push("/dashboard/add-order") }
          >
            Add Order
          </Button>
        </div>

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
        <TablePagination table={table} />
      </Card>
  );
};

export default TransactionsTable;