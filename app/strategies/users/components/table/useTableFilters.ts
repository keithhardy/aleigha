import * as React from "react";

export interface PaginationState {
  pageIndex: number;
  pageSize: number;
}

export interface SortingState {
  id: string;
  desc: boolean;
}

export interface RowSelectionState {
  [key: string]: boolean;
}

export interface ColumnFiltersState {
  id: string;
  value: unknown;
}

export type GlobalFilterState = string;

interface UseFiltersProps {
  initialPagination?: PaginationState;
  initialSorting?: SortingState[];
  initialRowSelection?: RowSelectionState;
  initialGlobalFilter?: GlobalFilterState;
  initialColumnFilters?: ColumnFiltersState[];
}

export function useFilters({
  initialPagination = { pageIndex: 0, pageSize: 10 },
  initialSorting = [],
  initialRowSelection = {},
  initialGlobalFilter = "",
  initialColumnFilters = [],
}: UseFiltersProps = {}) {
  const [pagination, setPagination] = React.useState(initialPagination);
  const [sorting, setSorting] = React.useState(initialSorting);
  const [rowSelection, setRowSelection] = React.useState(initialRowSelection);
  const [globalFilter, setGlobalFilter] = React.useState(initialGlobalFilter);
  const [columnFilters, setColumnFilters] = React.useState(initialColumnFilters);

  return React.useMemo(
    () => ({
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
    }),
    [pagination, sorting, rowSelection, globalFilter, columnFilters],
  );
}

export type FiltersState = ReturnType<typeof useFilters>;
