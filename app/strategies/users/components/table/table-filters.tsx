"use client";

import { type Table } from "@tanstack/react-table";

import { Input } from "@/components/ui/input";

interface TableFiltersProps<TData> {
  table: Table<TData>;
}

export function TableFilters<TData>({ table }: TableFiltersProps<TData>) {
  return (
    <Input
      placeholder="Search..."
      value={table.getState().globalFilter}
      onChange={(e) => table.setGlobalFilter(e.target.value)}
    />
  );
}
