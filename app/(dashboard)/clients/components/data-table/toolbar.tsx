"use client";

import { Cross2Icon, PlusCircledIcon } from "@radix-ui/react-icons";
import { type Table } from "@tanstack/react-table";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { ViewOptions } from "./view-options";

interface ToolbarProps<TData> {
  table: Table<TData>;
}

export function Toolbar<TData>({ table }: ToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

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
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <Link href="/clients/create">
          <Button variant="outline" size="sm">
            Create <PlusCircledIcon />
          </Button>
        </Link>
        <ViewOptions table={table} />
      </div>
    </div>
  );
}
