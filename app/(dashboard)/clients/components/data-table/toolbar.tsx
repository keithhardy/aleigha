"use client";

import { type Table } from "@tanstack/react-table";
import { UserPlus2, XCircle } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface ToolbarProps<TData> {
  table: Table<TData>;
  facets: Record<string, Record<string, number>>;
}

export function Toolbar<TData>({ table }: ToolbarProps<TData>) {
  const isFiltered =
    table.getState().columnFilters.length > 0 ||
    table.getState().globalFilter !== "";

  return (
    <>
      <div className="flex flex-col justify-between gap-2 md:flex-row">
        <div className="flex flex-grow flex-col gap-2 md:flex-row">
          <Input
            placeholder="Search..."
            value={(table.getState().globalFilter as string) ?? ""}
            onChange={(e) => table.setGlobalFilter(e.target.value)}
            className="h-[32px] max-w-[250px]"
          />
          <div className="flex w-full">
            <ScrollArea className="w-1 flex-1">
              <div className="flex gap-2">
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
                )}{" "}
              </div>
              <ScrollBar orientation="horizontal" className="hidden md:flex" />
            </ScrollArea>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href="/clients/create">
            <Button variant="outline" size="sm">
              <UserPlus2 />
              Create
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
