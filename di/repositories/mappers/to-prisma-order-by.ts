import { Filters } from "@/app/strategies/users/components/table/useFilters";

export function toPrismaOrderBy(
  sorting?: Filters["sorting"],
): Record<string, "asc" | "desc">[] | undefined {
  if (!sorting?.length) return undefined;

  return sorting.map((sort) => {
    const keys = sort.id.split(".");
    const field = keys.join(".");
    return { [field]: sort.desc ? "desc" : "asc" };
  });
}
