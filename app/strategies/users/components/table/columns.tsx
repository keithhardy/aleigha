"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
    header: ({ column }) => <ColumnHeader column={column} />,
    enableHiding: false,
    enableColumnFilter: false,
  },
  {
    accessorKey: "email",
    header: ({ column }) => <ColumnHeader column={column} />,
    enableSorting: false,
    enableColumnFilter: false,
  },
  {
    accessorKey: "phone",
    header: ({ column }) => <ColumnHeader column={column} />,
    enableSorting: false,
    enableColumnFilter: false,
  },
  {
    accessorKey: "role",
    header: ({ column }) => <ColumnHeader column={column} />,
    enableSorting: false,
  },
  {
    id: "actions",
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="data-[state=open]:bg-accent">
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
