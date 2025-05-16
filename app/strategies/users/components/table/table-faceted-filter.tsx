import { type Column } from "@tanstack/react-table";
import { ListFilterPlus } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TableFacetedFilterProps<TData, TValue> {
  column: Column<TData, TValue>;
  facets: { value: string; count: number }[];
}

export function TableFacetedFilter<TData, TValue>({
  column,
  facets,
}: TableFacetedFilterProps<TData, TValue>) {
  const selectedValues = new Set(column?.getFilterValue() as string[]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="capitalize data-[state=open]:bg-accent">
          <ListFilterPlus />
          {column.id}
          {selectedValues.size > 0 && (
            <Badge variant="secondary">{selectedValues.size} selected</Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Filter {column.id}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {facets.map((facet) => {
          const isSelected = selectedValues.has(facet.value);
          return (
            <DropdownMenuCheckboxItem
              key={facet.value}
              className="capitalize"
              checked={isSelected}
              onCheckedChange={() => {
                if (isSelected) {
                  selectedValues.delete(facet.value);
                } else {
                  selectedValues.add(facet.value);
                }
                const filterValues = Array.from(selectedValues);
                column?.setFilterValue(filterValues.length ? filterValues : undefined);
              }}
            >
              {facet.value}
              <span className="ml-auto">{facet.count}</span>
            </DropdownMenuCheckboxItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
