import { Filters } from "@/app/strategies/users/components/table/useFilters";

export function toPrismaSkip(pagination?: Filters["pagination"]): number | undefined {
  return pagination?.pageSize != null && pagination?.pageIndex != null
    ? pagination.pageIndex * pagination.pageSize
    : undefined;
}
