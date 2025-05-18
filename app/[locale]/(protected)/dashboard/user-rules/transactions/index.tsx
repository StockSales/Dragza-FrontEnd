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
import GetUsers from "@/services/users/GetAllUsers";
import {useEffect, useState} from "react";
import {Loader2} from "lucide-react";
import useGetUsersByRoleId from "@/services/users/GetUsersByRoleId";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {SelectItemText, SelectViewport} from "@radix-ui/react-select";
import {UserRoles} from "@/lib/data";

const TransactionsTable = () => {
  // getting all users hooks
  const {data, loading, gettingAllUsers} = GetUsers()

  // getting all users by role id
  const {loading: usersLoading, users, getUsersByRoleId} = useGetUsersByRoleId()

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const [selectedRole, setSelectedRole] = useState("");

  const handleSelectChange = async (value: string) => {
    setSelectedRole(value);
    await getUsersByRoleId(value);
  };

  const table = useReactTable({
    data: selectedRole ? users ?? [] : data ?? [],
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

  useEffect(() => {
    gettingAllUsers()
  }, []);

  // checking if the data is loading or not
  if (loading == true && usersLoading == true) {
    return (
        <div className="flex justify-center items-center">
          <Loader2 size={24} />
        </div>
    )
  }

  return (
      <div className={"flex flex-col"}>
        <Select value={selectedRole} onValueChange={handleSelectChange}>
          <SelectTrigger className="w-[180px] mx-6 mt-3">
            <SelectValue
                placeholder="Select Role"
            />
          </SelectTrigger>
          <SelectContent>
            <SelectViewport>
              {UserRoles.map((user) => (
                  <SelectItem key={user.id} value={user.id}>
                    {user.name}
                  </SelectItem>
              ))}
            </SelectViewport>
          </SelectContent>
        </Select>
        <Card className="w-full">
          <div className="flex flex-wrap gap-4 items-center py-4 px-5">

          </div>

          <CardContent>
            <div className="border border-solid border-default-200 rounded-lg overflow-hidden border-t-0">
              <Table>
                <TableHeader className="bg-default-200">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => {
                        return (
                          <TableHead className="last:text-start" key={header.id}>
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                          </TableHead>
                        );
                      })}
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
      </div>
  );
};
export default TransactionsTable;
