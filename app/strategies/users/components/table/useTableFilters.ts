import * as React from "react";

export interface PaginationState {
  pageIndex: number;
  pageSize: number;
}

export interface SortingState {
  id: string;
  desc: boolean;
}

interface UseFiltersProps {
  initialPagination?: PaginationState;
  initialSorting?: SortingState[];
}

export function useFilters({
  initialPagination = { pageIndex: 0, pageSize: 10 },
  initialSorting = [],
}: UseFiltersProps = {}) {
  const [pagination, setPagination] = React.useState(initialPagination);
  const [sorting, setSorting] = React.useState(initialSorting);

  return {
    pagination,
    setPagination,
    sorting,
    setSorting,
  };
}
