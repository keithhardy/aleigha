"use client";

import { type ColumnDef, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import * as React from "react";

import { TableContent } from "./table-content";
import { TableFilters } from "./table-filters";
import { TablePagination } from "./table-pagination";
import { TableViewOptions } from "./table-view-options";
import { Filters, useFilters } from "./useFilters";

interface DataTableProps<TData extends { id: string }, TValue> {
  columns: ColumnDef<TData, TValue>[];
  getData: (filters?: Filters) => Promise<TData[]>;
  getFacets: (filters?: Filters) => Promise<Record<string, { value: string; count: number }[]>>;
  getTotal: (filters?: Filters) => Promise<number>;
  initialData?: TData[];
  initialFacets: Record<string, { value: string; count: number }[]>;
  initialTotal: number;
}

export function Table<TData extends { id: string }, TValue>({
  columns,
  getData,
  getFacets,
  getTotal,
  initialData,
  initialFacets,
  initialTotal,
}: DataTableProps<TData, TValue>) {
  const [data, setData] = React.useState<TData[]>(initialData || []);
  const [facets, setFacets] = React.useState<Record<string, { value: string; count: number }[]>>(
    initialFacets || [],
  );
  const [total, setTotal] = React.useState<number>(initialTotal);
  const initialLoad = React.useRef(true);

  const {
    pagination,
    setPagination,
    sorting,
    setSorting,
    rowSelection,
    setRowSelection,
    globalFilter,
    setGlobalFilter,
    columnFilters,
    setColumnFilters,
  } = useFilters();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    onPaginationChange: setPagination,
    rowCount: total,
    manualSorting: true,
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    getRowId: (row) => row.id,
    manualFiltering: true,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    state: {
      sorting,
      pagination,
      rowSelection,
      globalFilter,
      columnFilters,
    },
  });

  React.useEffect(() => {
    if (initialLoad.current) {
      initialLoad.current = false;
      return;
    }

    const fetchData = async () => {
      const data = await getData({
        sorting,
        pagination,
        globalFilter,
        columnFilters,
      });

      const facets = await getFacets({
        globalFilter,
        columnFilters,
      });

      const total = await getTotal({
        globalFilter,
        columnFilters,
      });

      setData(data);
      setFacets(facets);
      setTotal(total);
    };

    fetchData();
  }, [sorting, pagination, globalFilter, columnFilters]);

  return (
    <>
      <TableFilters table={table} facets={facets} />
      <TableViewOptions table={table} />
      <TableContent table={table} columns={columns} />
      <TablePagination table={table} />
    </>
  );
}
