"use client";

import { Cross2Icon, PlusCircledIcon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { addDays } from "date-fns";
import Link from "next/link";
import { useRef, useState } from "react";
import { DateRange } from "react-day-picker";

import { DatePickerWithRange } from "@/components/date-picker-with-range";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

import { FacetedFilter } from "./faceted-filter";
import { ViewOptions } from "./view-options";

interface ToolbarProps<TData> {
  table: Table<TData>;
}

export function Toolbar<TData>({ table }: ToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const clientColumn = table.getColumn("client");
  const clientOptions = clientColumn
    ? Array.from(clientColumn.getFacetedUniqueValues().entries()).map(([value]) => ({
        label: String(value),
        value: String(value),
      }))
    : [];

  const creatorColumn = table.getColumn("creator");
  const creatorOptions = creatorColumn
    ? Array.from(creatorColumn.getFacetedUniqueValues().entries()).map(([value]) => ({
        label: String(value),
        value: String(value),
      }))
    : [];

  const statusColumn = table.getColumn("status");
  const statusOptions = statusColumn
    ? Array.from(statusColumn.getFacetedUniqueValues().entries()).map(([value]) => ({
        label: String(value),
        value: String(value),
      }))
    : [];

  const [, setDateRange] = useState<DateRange | undefined>(undefined);
  const datePickerRef = useRef<{ reset: () => void }>(null);

  const applyDateRangeFilter = (range: DateRange | undefined) => {
    const column = table.getColumn("startDate");
    if (column) {
      const fromDate = range?.from ? range.from.toISOString() : null;
      const toDate = range?.to ? range.to.toISOString() : null;

      column.setFilterValue({
        from: fromDate,
        to: toDate,
      });
    }
  };

  const handleDateRangeSelect = (range: DateRange | undefined) => {
    if (range?.from) {
      if (!range.to) {
        range = { from: range.from, to: addDays(range.from, 1) };
      } else {
        range = { from: range.from, to: addDays(range.to, 1) };
      }
    }

    setDateRange(range);
    applyDateRangeFilter(range);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input placeholder="Search..." value={(table.getState().globalFilter as string) ?? ""} onChange={(event) => table.setGlobalFilter(event.target.value)} className="h-8 w-[150px] border-dashed lg:w-[250px]" />

        <DatePickerWithRange ref={datePickerRef} onSelect={handleDateRangeSelect} />

        {clientColumn && <FacetedFilter column={clientColumn} title="Client" options={clientOptions} />}

        {creatorColumn && <FacetedFilter column={creatorColumn} title="Operative" options={creatorOptions} />}

        {statusColumn && <FacetedFilter column={statusColumn} title="Status" options={statusOptions} />}

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => {
              datePickerRef.current?.reset();
              table.resetColumnFilters();
            }}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm">
              Create <PlusCircledIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href="/certificates/eicr/create" className="cursor-pointer">
                Electrical Installation Condition Report
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild disabled>
              <Link href="#" className="cursor-pointer">
                Electrical Installation Certificate
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild disabled>
              <Link href="#" className="cursor-pointer">
                Electrical Minor Works
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild disabled>
              <Link href="#" className="cursor-pointer">
                Fire Detection Installation Certificate
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild disabled>
              <Link href="#" className="cursor-pointer">
                Domestic Ventilation Installation Certificate
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild disabled>
              <Link href="#" className="cursor-pointer">
                Emergency Lighting Installation Condition Report
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild disabled>
              <Link href="#" className="cursor-pointer">
                Emergency Lighting Installation Certificate
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild disabled>
              <Link href="#" className="cursor-pointer">
                Electrical Danger Notification
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <ViewOptions table={table} />
      </div>
    </div>
  );
}
