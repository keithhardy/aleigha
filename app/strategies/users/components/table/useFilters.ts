import * as React from "react";

interface PaginationState {
  pageIndex: number;
  pageSize: number;
}

interface SortingState {
  id: string;
  desc: boolean;
}

interface RowSelectionState {
  [key: string]: boolean;
}

interface ColumnFiltersState {
  id: string;
  value: unknown;
}

interface UseFiltersProps {
  initialPagination?: PaginationState;
  initialSorting?: SortingState[];
  initialRowSelection?: RowSelectionState;
  initialGlobalFilter?: string;
  initialColumnFilters?: ColumnFiltersState[];
}

export interface Filters {
  pagination?: PaginationState;
  sorting?: SortingState[];
  globalFilter?: string;
  columnFilters?: ColumnFiltersState[];
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

  return {
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
  };
}
