import { type Row, type Table } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";

interface SelectAllProps<TData> {
  table: Table<TData>;
}

interface SelectRowProps<TData> {
  row: Row<TData>;
}

export function SelectAll<TData>({ table }: SelectAllProps<TData>) {
  return (
    <Checkbox
      checked={
        table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")
      }
      onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      className="ml-2 mr-4"
    />
  );
}

export function SelectRow<TData>({ row }: SelectRowProps<TData>) {
  return (
    <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={(value) => row.toggleSelected(!!value)}
      className="ml-2 mr-4"
    />
  );
}
