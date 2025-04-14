"use client";

import { Cross2Icon, PlusCircledIcon } from "@radix-ui/react-icons";
import { type Table } from "@tanstack/react-table";
import Link from "next/link";

import {
  DialogSheet,
  DialogSheetContent,
  DialogSheetTitle,
  DialogSheetTrigger,
} from "@/components/dialog-sheet";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";

import { FacetedFilter } from "./faceted-filter";
import { ViewOptions } from "./view-options";

interface ToolbarProps<TData> {
  table: Table<TData>;
}

export function Toolbar<TData>({ table }: ToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const typeColumn = table.getColumn("type");
  const typeOptions = typeColumn
    ? Array.from(typeColumn.getFacetedUniqueValues().entries()).map(
        ([value]) => ({
          label: String(value),
          value: String(value),
        }),
      )
    : [];

  const clientColumn = table.getColumn("client");
  const clientOptions = clientColumn
    ? Array.from(clientColumn.getFacetedUniqueValues().entries()).map(
        ([value]) => ({
          label: String(value),
          value: String(value),
        }),
      )
    : [];

  const creatorColumn = table.getColumn("creator");
  const creatorOptions = creatorColumn
    ? Array.from(creatorColumn.getFacetedUniqueValues().entries()).map(
        ([value]) => ({
          label: String(value),
          value: String(value),
        }),
      )
    : [];

  const statusColumn = table.getColumn("status");
  const statusOptions = statusColumn
    ? Array.from(statusColumn.getFacetedUniqueValues().entries()).map(
        ([value]) => ({
          label: String(value),
          value: String(value),
        }),
      )
    : [];

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Search..."
          value={(table.getState().globalFilter as string) ?? ""}
          onChange={(event) => table.setGlobalFilter(event.target.value)}
          className="h-8 w-[150px] border-dashed lg:w-[250px]"
        />

        {typeColumn && (
          <FacetedFilter
            column={typeColumn}
            title="Type"
            options={typeOptions}
          />
        )}

        {clientColumn && (
          <FacetedFilter
            column={clientColumn}
            title="Client"
            options={clientOptions}
          />
        )}

        {creatorColumn && (
          <FacetedFilter
            column={creatorColumn}
            title="Operative"
            options={creatorOptions}
          />
        )}

        {statusColumn && (
          <FacetedFilter
            column={statusColumn}
            title="Status"
            options={statusOptions}
          />
        )}

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => {
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
        <DialogSheet>
          <DialogSheetTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-between"
              size="sm"
            >
              Create <PlusCircledIcon />
            </Button>
          </DialogSheetTrigger>
          <DialogSheetContent className="p-0">
            <DialogSheetTitle className="hidden" />
            <Command className="pt-2">
              <CommandInput placeholder="Search..." />
              <CommandList className="scrollbar-hidden mt-1 border-t p-1">
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                  <Link href="/certificates/eicr/create">
                    <CommandItem value="Electrical Installation Condition Report">
                      Electrical Installation Condition Report
                    </CommandItem>
                  </Link>
                  <Link href="/certificates/eic/create">
                    <CommandItem value="Electrical Installation Certificate">
                      Electrical Installation Certificate
                    </CommandItem>
                  </Link>
                  <Link href="/certificates/eic/create">
                    <CommandItem value="Minor Works Certificate">
                      Minor Works Certificate
                    </CommandItem>
                  </Link>
                  <Link href="/certificates/eic/create">
                    <CommandItem value="Fire Detection Installation Certificate">
                      Fire Detection Installation Certificate
                    </CommandItem>
                  </Link>
                  <Link href="/certificates/eic/create">
                    <CommandItem value="Domestic Ventilation Installation Certificate">
                      Domestic Ventilation Installation Certificate
                    </CommandItem>
                  </Link>
                  <Link href="/certificates/eic/create">
                    <CommandItem value="Emergency Lighting Installation Condition Report">
                      Emergency Lighting Installation Condition Report
                    </CommandItem>
                  </Link>
                  <Link href="/certificates/eic/create">
                    <CommandItem value="Emergency Lighting Installation Certificate">
                      Emergency Lighting Installation Certificate
                    </CommandItem>
                  </Link>
                  <Link href="/certificates/eic/create">
                    <CommandItem value="Electrical Danger Notification">
                      Electrical Danger Notification
                    </CommandItem>
                  </Link>
                </CommandGroup>
              </CommandList>
            </Command>
          </DialogSheetContent>
        </DialogSheet>

        <ViewOptions table={table} />
      </div>
    </div>
  );
}
