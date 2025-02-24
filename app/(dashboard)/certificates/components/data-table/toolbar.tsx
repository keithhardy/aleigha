"use client";

import { Cross2Icon, PlusCircledIcon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { addDays } from "date-fns";
import Link from "next/link";
import { useRef, useState } from "react";
import { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

import { FacetedFilter } from "./faceted-filter";
import { ViewOptions } from "./view-options";

interface ToolbarProps<TData> {
  table: Table<TData>;
}

export function Toolbar<TData>({ table }: ToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const [, setDateRange] = useState<DateRange | undefined>(undefined);
  const datePickerRef = useRef<{ reset: () => void }>(null);

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Search..."
          value={(table.getState().globalFilter as string) ?? ""}
          onChange={(event) => table.setGlobalFilter(event.target.value)}
          className="h-8 w-[150px] border-dashed lg:w-[250px]"
        />

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
              <Link
                href="/certificates/electrical-installation-condition-report/create"
                className="cursor-pointer"
              >
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
