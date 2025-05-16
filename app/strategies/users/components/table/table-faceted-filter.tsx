import { type Column } from "@tanstack/react-table";
import { ListFilterPlus } from "lucide-react";

import {
  DialogSheet,
  DialogSheetTrigger,
  DialogSheetContent,
  DialogSheetTitle,
} from "@/components/dialog-sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

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
    <DialogSheet>
      <DialogSheetTrigger asChild>
        <Button variant="outline" size="sm" className="capitalize">
          <ListFilterPlus />
          {column.id}
          {selectedValues.size > 0 && (
            <Badge variant="secondary">{selectedValues.size} selected</Badge>
          )}
        </Button>
      </DialogSheetTrigger>
      <DialogSheetContent className="p-0">
        <DialogSheetTitle className="hidden" />
        <Command className="pt-2">
          <CommandInput placeholder="Search..." autoFocus={false} />
          <CommandList className="scrollbar-hidden mt-1 border-t p-1">
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {facets.map((facet) => {
                const isSelected = selectedValues.has(facet.value);
                return (
                  <CommandItem
                    key={facet.value}
                    className="capitalize"
                    onSelect={() => {
                      if (isSelected) {
                        selectedValues.delete(facet.value);
                      } else {
                        selectedValues.add(facet.value);
                      }
                      const filterValues = Array.from(selectedValues);
                      column?.setFilterValue(filterValues.length ? filterValues : undefined);
                    }}
                  >
                    <Checkbox checked={isSelected} />
                    {facet.value}
                    <span className="ml-auto">{facet.count}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </DialogSheetContent>
    </DialogSheet>
  );
}
