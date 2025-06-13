"use client";

import { useEffect, useState } from "react";
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

import { getColumns } from "./columns";

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

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {useRouter} from "@/i18n/routing";
import useGettingAllMainAreas from "@/services/area/gettingAllMainAreas";
import useGettingAllSubArea from "@/services/subArea/gettingAllSubArea";
import {AreaType, MainArea} from "@/types/areas";

const AreasTable = () => {
  //getting all areas
  const {loading: mainAreasLoading, mainAreas, getAllMainAreas, error: mainAreasError} = useGettingAllMainAreas()

  // getting all secondary areas
  const {error: subAreasError, allSubArea, loading: subAreasLoading, getAllSubArea} = useGettingAllSubArea()

  const router = useRouter();

  const [selectedAreaType, setSelectedAreaType] = useState<"main" | "secondary">("main");

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});


  // Filter areas based on selected type
  const filteredAreas = React.useMemo<MainArea[]>(() => {
    if (selectedAreaType === "main") return mainAreas || [];
    if (selectedAreaType === "secondary") return allSubArea || [];
    return [];
  }, [selectedAreaType, mainAreas, allSubArea]);

  const columns = getColumns(selectedAreaType);


  const table = useReactTable({
    data: filteredAreas,
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
    if (selectedAreaType === "main") {
      getAllMainAreas();
    } else if (selectedAreaType === "secondary") {
      getAllSubArea();
    }
  }, [selectedAreaType]);


  if (subAreasLoading || mainAreasLoading) {
    return (
        <div className="flex items-center justify-center h-full">
          <Loader2 className="w-6 h-6 animate-spin" />
        </div>
    );
  }

  return (
      <Card className="w-full">
        <div className="flex justify-between flex-wrap gap-4 items-center py-4 px-5">
          <div className="flex-1 text-xl flex gap-4 font-medium text-default-900">
            <Select value={selectedAreaType} onValueChange={(value: "main" | "secondary") => setSelectedAreaType(value)}>
              <SelectTrigger className="w-[180px] cursor-pointer">
                <SelectValue placeholder="Select Area Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Area Types</SelectLabel>
                  <SelectItem value="main">Main Areas</SelectItem>
                  <SelectItem value="secondary">Secondary Areas</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <Button size={"md"} variant="outline" onClick={() => router.push(`/dashboard/add-area/${selectedAreaType}`)}>
              Add Area
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

export default AreasTable;