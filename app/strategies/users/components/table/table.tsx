"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
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
import { useFilters } from "./useTableFilters";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function Table<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  const filters = useFilters();

  const table = useReactTable({
    // Table
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),

    // Pagination
    manualPagination: true,
    onPaginationChange: filters.setPagination,
    rowCount: 100, // TODO: Fetch this from the server

    // Sorting
    manualSorting: true,
    onSortingChange: filters.setSorting,

    // Row selection
    onRowSelectionChange: filters.setRowSelection,
    getRowId: (row, index) => (row as { id: string }).id ?? index.toString(), // TODO: Fix the type of row

    // Filters
    manualFiltering: true,
    onGlobalFilterChange: filters.setGlobalFilter,
    onColumnFiltersChange: filters.setColumnFilters,

    // State
    state: {
      sorting: filters.sorting,
      pagination: filters.pagination,
      rowSelection: filters.rowSelection,
      globalFilter: filters.globalFilter,
      columnFilters: filters.columnFilters,
    },
  });

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
