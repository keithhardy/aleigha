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
  const isFiltered = !!table.getState().globalFilter || table.getState().columnFilters.length > 0;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Input
        placeholder="Search..."
        value={table.getState().globalFilter}
        onChange={(e) => table.setGlobalFilter(e.target.value)}
        className="w-auto"
      />

      {Object.entries(facets).map(([key, facet]) =>
        table.getColumn(key)?.getCanFilter() ? (
          <TableFacetedFilter key={key} column={table.getColumn(key)!} facets={facet} />
        ) : null,
      )}

      {isFiltered && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            table.resetColumnFilters();
            table.setGlobalFilter("");
          }}
        >
          <XCircle className="mr-1 h-4 w-4" />
          Clear
        </Button>
      )}
    </div>
  );
}
