import { Filters } from "@/app/strategies/users/components/table/useFilters";

export function toPrismaTake(pagination?: Filters["pagination"]): number | undefined {
  return pagination?.pageSize != null ? pagination?.pageSize : undefined;
}
