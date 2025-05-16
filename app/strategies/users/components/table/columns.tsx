"use client";

import { type ColumnDef } from "@tanstack/react-table";

import { ColumnActions } from "./column-actions";
import { ExpandToggle } from "./column-expand-toggle";
import { ColumnHeader } from "./column-header";
import { SelectAllPageRows, SelectRow } from "./column-select";
import { User } from "./table-types";

export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => <SelectAllPageRows table={table} />,
    cell: ({ row }) => <SelectRow row={row} />,
  },
  {
    accessorKey: "name",
    header: ({ column }) => <ColumnHeader column={column} />,
    enableSorting: true,
    enableHiding: false,
    enableColumnFilter: false,
  },
  {
    accessorKey: "email",
    header: ({ column }) => <ColumnHeader column={column} />,
    enableSorting: false,
    enableHiding: true,
    enableColumnFilter: false,
  },
  {
    accessorKey: "phone",
    header: ({ column }) => <ColumnHeader column={column} />,
    enableSorting: false,
    enableHiding: true,
    enableColumnFilter: false,
  },
  {
    accessorKey: "role",
    header: ({ column }) => <ColumnHeader column={column} />,
    enableSorting: false,
    enableHiding: true,
    enableColumnFilter: true,
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="flex justify-end">
        <ExpandToggle row={row} />
        <ColumnActions row={row} />
      </div>
    ),
  },
];
