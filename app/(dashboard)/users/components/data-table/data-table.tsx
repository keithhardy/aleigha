"use client";

import { User, UserRole } from "@prisma/client";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type RowSelectionState,
  type SortingState,
  useReactTable,
  flexRender,
  getCoreRowModel,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";

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
import { Pagination } from "./pagination";
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
  const [total, setTotal] = useState<number>(totalCount);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState<string>();
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [pagination, setPagination] = useState({
    pageSize: 10,
    pageIndex: 0,
  });
  const [facetedValues, setFacetedValues] =
    useState<Record<string, Record<string, number>>>(facetedUniqueValues);

  const table = useReactTable({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting,
      columnFilters,
      globalFilter,
      rowSelection,
      pagination,
    },
    rowCount: total,
    manualSorting: true,
    manualFiltering: true,
    manualPagination: true,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    getFacetedUniqueValues: (_table, columnId) => {
      return () => {
        const values = facetedValues[columnId] ?? {};
        return new Map(Object.entries(values));
      };
    },
    getRowId: (row) => row.id,
  });

  useEffect(() => {
    const fetchData = async () => {
      const orderBy = sorting.map((sort) => ({
        [sort.id]: sort.desc ? "desc" : "asc",
      }));

      const { users, totalCount, facetedUniqueValues } = await getUsers({
        take: pagination.pageSize,
        skip: pagination.pageIndex * pagination.pageSize,
        orderBy,
        roles: columnFilters.find((f) => f.id === "role")?.value as
          | UserRole[]
          | undefined,
        searchQuery: globalFilter,
      });

      setData(users);
      setTotal(totalCount);
      setFacetedValues(facetedUniqueValues);

      const cleanedFilters = columnFilters.map((filter) => {
        const validValues = Object.keys(
          (facetedUniqueValues as Record<string, Record<string, number>>)[
            filter.id
          ] ?? {},
        );

        if (Array.isArray(filter.value)) {
          const filteredValues = filter.value.filter((val) =>
            validValues.includes(val),
          );
          return { ...filter, value: filteredValues };
        }

        return filter;
      });

      const finalFilters = cleanedFilters.filter(
        (f) => !(Array.isArray(f.value) && f.value.length === 0),
      );

      if (JSON.stringify(finalFilters) !== JSON.stringify(columnFilters)) {
        setColumnFilters(finalFilters);
      }
    };

    fetchData();
  }, [sorting, columnFilters, globalFilter, pagination]);

  return (
    <div className="space-y-4">
      <Toolbar table={table} facetedValues={facetedValues} />
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
        <CardFooter className="flex justify-end space-x-4 rounded-b-md border-t bg-muted py-4">
          <Pagination table={table} />
        </CardFooter>
      </Card>
    </div>
  );
}
