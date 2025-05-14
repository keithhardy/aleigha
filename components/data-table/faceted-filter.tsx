import { type Column } from "@tanstack/react-table";
import { CheckIcon, ListFilterPlus } from "lucide-react";

import {
  DialogSheet,
  DialogSheetContent,
  DialogSheetTitle,
  DialogSheetTrigger,
} from "@/components/dialog-sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

interface FilterProps<TData, TValue> {
  column: Column<TData, TValue>;
  title?: string;
  options: {
    label: string;
    value: string;
    number: number;
  }[];
}

export function FacetedFilter<TData, TValue>({
  column,
  title,
  options,
}: FilterProps<TData, TValue>) {
  const selectedValues = new Set(column?.getFilterValue() as string[]);

  return (
    <DialogSheet>
      <DialogSheetTrigger asChild>
        <Button variant="outline" size="sm">
          <ListFilterPlus />
          {title}
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
              {options.map((option) => {
                const isSelected = selectedValues.has(option.value);
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      if (isSelected) {
                        selectedValues.delete(option.value);
                      } else {
                        selectedValues.add(option.value);
                      }
                      const filterValues = Array.from(selectedValues);
                      column?.setFilterValue(filterValues.length ? filterValues : undefined);
                    }}
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible",
                      )}
                    >
                      <CheckIcon />
                    </div>
                    {option.label}
                    <span className="ml-auto">{option.number}</span>
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
