"use client";

import {
  type ColumnDef,
  type ColumnFiltersState,
  type RowSelectionState,
  type SortingState,
  type Table as TableType,
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

import { Pagination } from "./pagination";

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  facets: Record<string, Record<string, number>>;
}

export interface FetchDataArgs {
  take: number;
  skip: number;
  orderBy?: Array<Record<string, "asc" | "desc">>;
  filters?: ColumnFiltersState;
  searchQuery?: string;
}

export interface DataTableProps<TData extends { id: string }, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: PaginatedResponse<TData>;
  fetchData: (args: FetchDataArgs) => Promise<PaginatedResponse<TData>>;
  toolbar?: React.ComponentType<{
    table: TableType<TData>;
    facets: Record<string, Record<string, number>>;
  }>;
}

export function DataTable<TData extends { id: string }, TValue>({
  columns,
  data: { data: initialData, total: initialTotal, facets: initialFacets },
  fetchData,
  toolbar: ToolbarComponent,
}: DataTableProps<TData, TValue>) {
  const [data, setData] = useState<TData[]>(initialData);
  const [total, setTotal] = useState<number>(initialTotal);
  const [facets, setFacets] =
    useState<Record<string, Record<string, number>>>(initialFacets);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [pagination, setPagination] = useState({
    pageSize: 10,
    pageIndex: 0,
  });

  const table = useReactTable({
    data,
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
    getRowId: (row) => row.id,
  });

  useEffect(() => {
    const fetch = async () => {
      const orderBy = sorting.map((sort) => {
        const keys = sort.id.split(".");
        if (keys.length === 1) {
          return { [keys[0]]: sort.desc ? "desc" : "asc" };
        }
        return { [keys.join(".")]: sort.desc ? "desc" : "asc" };
      }) as Array<Record<string, "asc" | "desc">>;

      const { data, total, facets } = await fetchData({
        take: pagination.pageSize,
        skip: pagination.pageIndex * pagination.pageSize,
        orderBy: orderBy,
        filters: columnFilters,
        searchQuery: globalFilter,
      });

      setData(data);
      setTotal(total);
      setFacets(facets);
    };

    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sorting, columnFilters, globalFilter, pagination]);

  return (
    <div className="space-y-4">
      {ToolbarComponent && <ToolbarComponent table={table} facets={facets} />}
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
        <CardFooter className="flex justify-center gap-4 rounded-b-md border-t bg-muted py-4 lg:justify-between">
          <Pagination table={table} />
        </CardFooter>
      </Card>
    </div>
  );
}
