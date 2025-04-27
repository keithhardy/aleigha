"use client";

import {
  type ColumnDef,
  type ColumnFiltersState,
  type ExpandedState,
  type RowSelectionState,
  type SortingState,
  type Table as TableType,
  useReactTable,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
} from "@tanstack/react-table";
import { Fragment, useEffect, useState } from "react";

import { Pagination } from "@/components/data-table/pagination";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { ElectricalInstalationConditionReportWithRelations } from "./columns";

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

export interface DataTableProps<
  TData extends ElectricalInstalationConditionReportWithRelations,
  TValue,
> {
  columns: ColumnDef<TData, TValue>[];
  data: PaginatedResponse<TData>;
  fetchData: (args: FetchDataArgs) => Promise<PaginatedResponse<TData>>;
  toolbar?: React.ComponentType<{
    table: TableType<TData>;
    facets: Record<string, Record<string, number>>;
  }>;
}

export function DataTable<
  TData extends ElectricalInstalationConditionReportWithRelations,
  TValue,
>({
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

  const [expanded, setExpanded] = useState<ExpandedState>({});

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
      expanded,
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
    onExpandedChange: setExpanded,
    getExpandedRowModel: getExpandedRowModel(),
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
  }, [sorting, columnFilters, globalFilter, pagination, fetchData]);

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
                    <Fragment key={row.id}>
                      <TableRow>
                        {row.getVisibleCells().map((cell) => (
                          <TableCell
                            className="whitespace-nowrap"
                            key={cell.id}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                      <Collapsible asChild open={row.getIsExpanded()}>
                        <CollapsibleContent asChild>
                          <TableRow>
                            <TableCell colSpan={columns.length}>
                              <div className="py-2 text-center">
                                {row.original.property.address?.streetAddress}
                              </div>
                            </TableCell>
                          </TableRow>
                        </CollapsibleContent>
                      </Collapsible>
                    </Fragment>
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

        <CardFooter className="flex flex-col-reverse justify-center gap-4 rounded-b-md border-t bg-muted py-4 md:flex-row md:justify-between">
          <Pagination table={table} />
        </CardFooter>
      </Card>
    </div>
  );
}
