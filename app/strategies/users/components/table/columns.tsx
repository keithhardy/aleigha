"use client";

import { type ColumnDef } from "@tanstack/react-table";

import { ColumnActions } from "./column-actions";
import { ColumnHeader } from "./column-header";
import { SelectAllPageRows, SelectRow } from "./column-select";

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "Admin" | "Manager" | "Planner" | "Operative" | "Client";
  signature: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => <SelectAllPageRows table={table} />,
    cell: ({ row }) => <SelectRow row={row} />,
  },
  {
    accessorKey: "name",
    header: ({ column }) => <ColumnHeader column={column} title="Name" />,
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    id: "actions",
    cell: ({ row }) => <ColumnActions row={row} />,
  },
];
