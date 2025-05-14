"use client";

import { type ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import * as React from "react";

import {
  Table as TableRoot,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { TableFilters } from "./table-filters";
import { TablePagination } from "./table-pagination";
import { TableViewOptions } from "./table-view-options";
import { Filters, useFilters } from "./useFilters";

interface DataTableProps<TData, TValue> {
  initialData?: TData[];
  getData: (filters?: Filters) => Promise<TData[]>;
  columns: ColumnDef<TData, TValue>[];
}

export function Table<TData, TValue>({
  initialData,
  getData,
  columns,
}: DataTableProps<TData, TValue>) {
  const [data, setData] = React.useState<TData[]>(initialData || []);

  const {
    pagination,
    setPagination,
    sorting,
    setSorting,
    rowSelection,
    setRowSelection,
    globalFilter,
    setGlobalFilter,
    columnFilters,
    setColumnFilters,
  } = useFilters();

  const table = useReactTable({
    // Table
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),

    // Pagination
    manualPagination: true,
    onPaginationChange: setPagination,
    rowCount: 9, // TODO: Fetch this from the server

    // Sorting
    manualSorting: true,
    onSortingChange: setSorting,

    // Row selection
    onRowSelectionChange: setRowSelection,
    getRowId: (row, index) => (row as { id: string }).id ?? index.toString(), // TODO: Fix the type of row

    // Filters
    manualFiltering: true,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,

    // State
    state: {
      sorting,
      pagination,
      rowSelection,
      globalFilter,
      columnFilters,
    },
  });

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await getData({
        sorting,
        pagination,
        globalFilter,
        columnFilters,
      });

      setData(data);
    };

    fetchData();
  }, [sorting, pagination, globalFilter, columnFilters]);

  return (
    <>
      {/* Filters */}
      <TableFilters table={table} />

      {/* View options */}
      <TableViewOptions table={table} />

      {/* Table */}
      <TableRoot>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </TableRoot>

      {/* Pagination */}
      <TablePagination table={table} />
    </>
  );
}
