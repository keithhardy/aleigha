import { type Column } from "@tanstack/react-table";
import { ListFilterPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { type DateRange } from "react-day-picker";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  DialogSheet,
  DialogSheetContent,
  DialogSheetTitle,
  DialogSheetTrigger,
} from "@/components/ui/dialog-sheet";

interface FilterProps<TData, TValue> {
  column: Column<TData, TValue>;
  title?: string;
}

export function DateFilter<TData, TValue>({
  column,
  title = "Date",
}: FilterProps<TData, TValue>) {
  const filterValue = column.getFilterValue() as DateRange | undefined;

  const [range, setRange] = useState<DateRange | undefined>(filterValue);

  useEffect(() => {
    setRange(filterValue);
  }, [filterValue]);

  const applyFilter = (newRange: DateRange | undefined) => {
    setRange(newRange);
    if (newRange?.from && newRange?.to) {
      column.setFilterValue(newRange);
    } else {
      column.setFilterValue(undefined);
    }
  };

  const badgeLabel =
    range?.from && range?.to
      ? `${range.from.toLocaleDateString()} - ${range.to.toLocaleDateString()}`
      : "None";

  return (
    <DialogSheet>
      <DialogSheetTrigger asChild>
        <Button variant="outline" size="sm">
          <ListFilterPlus className="mr-2 h-4 w-4" />
          {title}
          {range?.from && range?.to && (
            <Badge className="ml-2" variant="secondary">
              {badgeLabel}
            </Badge>
          )}
        </Button>
      </DialogSheetTrigger>
      <DialogSheetContent className="w-auto p-8">
        <DialogSheetTitle className="hidden" />
        <Calendar
          initialFocus
          mode="range"
          selected={range}
          onSelect={applyFilter}
          numberOfMonths={1}
          className="m-auto w-[250px]"
        />
      </DialogSheetContent>
    </DialogSheet>
  );
}
