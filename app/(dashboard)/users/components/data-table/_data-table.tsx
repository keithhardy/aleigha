"use client";

import { User, UserRole } from "@prisma/client";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  useReactTable,
  flexRender,
  getCoreRowModel,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { getUsers } from "./get-users";
import { Toolbar } from "./toolbar";

interface DataTableProps {
  columns: ColumnDef<User>[];
  data: {
    users: User[];
    totalCount: number;
    facetedUniqueValues: Record<string, Record<string, number>>;
  };
}

export function DataTable({
  columns,
  data: { users: initialData, totalCount, facetedUniqueValues },
}: DataTableProps) {
  const [data, setData] = useState<User[]>(initialData);
  const [quantity, setQuantity] = useState<number>(10);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState<string>();

  const table = useReactTable({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    manualSorting: true,
    onSortingChange: setSorting,
    manualFiltering: true,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getFacetedUniqueValues: (_table, columnId) => {
      return () => {
        const values = facetedUniqueValues[columnId] ?? {};
        return new Map(Object.entries(values));
      };
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      const orderBy = sorting.map((sort) => ({
        [sort.id]: sort.desc ? "desc" : "asc",
      }));

      const { users } = await getUsers({
        take: quantity,
        orderBy,
        roles: columnFilters.find((f) => f.id === "role")?.value as
          | UserRole[]
          | undefined,
        searchQuery: globalFilter,
      });

      setData(users);
    };

    fetchData();
  }, [quantity, sorting, columnFilters, globalFilter]);

  return (
    <div className="space-y-4">
      <Toolbar table={table} />
      <Card className="rounded-md shadow-none">
        <CardContent className="flex p-0">
          <ScrollArea className="w-1 flex-1">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className="whitespace-nowrap">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="py-4 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </CardContent>
        <CardFooter className="flex justify-center space-x-4 rounded-b-md border-t bg-muted py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setQuantity((prev) => Math.max(prev + 10, 0))}
            disabled={quantity >= totalCount}
          >
            {quantity >= totalCount ? "No more to load" : "Load more"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
