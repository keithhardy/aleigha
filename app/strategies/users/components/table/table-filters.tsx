"use client";

import { type Table } from "@tanstack/react-table";
import { XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { TableFacetedFilter } from "./table-faceted-filter";

interface TableFiltersProps<TData> {
  table: Table<TData>;
  facets: Record<string, { value: string; count: number }[]>;
}

export function TableFilters<TData>({ table, facets }: TableFiltersProps<TData>) {
  const isFiltered =
    table.getState().columnFilters.length > 0 || table.getState().globalFilter !== "";
  const resetFilters = () => {
    table.resetColumnFilters();
    table.setGlobalFilter("");
  };

  return (
    <>
      <Input
        placeholder="Search..."
        value={table.getState().globalFilter}
        onChange={(e) => table.setGlobalFilter(e.target.value)}
      />

      {Object.entries(facets).map(([key, facet]) => {
        const column = table.getColumn(key);
        return column ? <TableFacetedFilter key={key} column={column} facets={facet} /> : null;
      })}

      {isFiltered && (
        <Button variant="outline" size="sm" onClick={resetFilters}>
          <XCircle className="mr-2 h-4 w-4" />
          Clear
        </Button>
      )}
    </>
  );
}
