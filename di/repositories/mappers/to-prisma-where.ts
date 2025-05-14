import { Filters } from "@/app/strategies/users/components/table/useFilters";

export function toPrismaWhere(
  filters?: Filters,
  globalFilterFields: string[] = [],
  excludeFilterId?: string,
): Record<string, any> {
  return {
    ...(filters?.columnFilters?.reduce(
      (acc, filter) => {
        if (filter.id === excludeFilterId) return acc;
        if (Array.isArray(filter.value) && filter.value.length > 0) {
          return {
            ...acc,
            [filter.id]: { in: filter.value },
          };
        }
        return acc;
      },
      {} as Record<string, any>,
    ) ?? {}),

    ...(filters?.globalFilter
      ? {
          OR: globalFilterFields.map((field) => ({
            [field]: {
              contains: filters.globalFilter,
              mode: "insensitive",
            },
          })),
        }
      : {}),
  };
}
