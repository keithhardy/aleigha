import { type Row, type Table } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";

interface SelectAllPageRowsProps<TData> {
  table: Table<TData>;
}

export function SelectAllPageRows<TData>({ table }: SelectAllPageRowsProps<TData>) {
  return (
    <Checkbox
      className="ml-2"
      checked={
        table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")
      }
      onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    />
  );
}

interface SelectRowProps<TData> {
  row: Row<TData>;
}

export function SelectRow<TData>({ row }: SelectRowProps<TData>) {
  return (
    <Checkbox
      className="ml-2"
      checked={row.getIsSelected()}
      onCheckedChange={(value) => row.toggleSelected(!!value)}
    />
  );
}
