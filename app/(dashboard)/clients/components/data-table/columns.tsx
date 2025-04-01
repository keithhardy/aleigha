"use client";

import { Address, Client } from "@prisma/client";
import { type ColumnDef } from "@tanstack/react-table";

import { ColumnHeader } from "@/app/(dashboard)/clients/components/data-table/column-header";
import { RowActions } from "@/app/(dashboard)/clients/components/data-table/row-actions";

export const columns: ColumnDef<
  Client & {
    address: Address | null;
  }
>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <ColumnHeader column={column} title="Name" />,
  },
  {
    accessorKey: "appointedPerson",
    header: ({ column }) => (
      <ColumnHeader column={column} title="Appointed Person" />
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => <ColumnHeader column={column} title="Email" />,
  },
  {
    accessorKey: "phone",
    header: ({ column }) => <ColumnHeader column={column} title="Phone" />,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <div className="text-right">
          <RowActions client={row.original} />
        </div>
      );
    },
  },
];
