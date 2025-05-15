import { type Column } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ColumnHeaderProps<TData, TValue> {
  column: Column<TData, TValue>;
}

export function ColumnHeader<TData, TValue>({ column }: ColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort() && !column.getCanHide()) {
    return <div className="capitalize">{column.id}</div>;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="-ml-4 capitalize data-[state=open]:bg-accent">
          <span>{column.id}</span>
          {column.getCanSort() &&
            (column.getIsSorted() === "desc" ? (
              <ArrowDown />
            ) : column.getIsSorted() === "asc" ? (
              <ArrowUp />
            ) : (
              <ArrowUpDown />
            ))}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {column.getCanSort() && (
          <>
            <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
              <ArrowUp />
              Asc
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
              <ArrowDown />
              Desc
            </DropdownMenuItem>
          </>
        )}
        {column.getCanHide() && column.getCanSort() && <DropdownMenuSeparator />}
        {column.getCanHide() && (
          <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
            <EyeOff />
            Hide
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
