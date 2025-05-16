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
    <div className="flex">
      <Input
        placeholder="Search..."
        value={table.getState().globalFilter}
        onChange={(e) => table.setGlobalFilter(e.target.value)}
        className="h-8"
      />

      {Object.entries(facets).map(
        ([key, facet]) =>
          table.getColumn(key)?.getCanFilter() ? (
            <TableFacetedFilter key={key} column={table.getColumn(key)!} facets={facet} />
          ) : null,
        1,
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
          <XCircle />
          Clear
        </Button>
      )}
    </div>
  );
}
