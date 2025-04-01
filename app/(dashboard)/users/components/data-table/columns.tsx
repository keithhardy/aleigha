"use client";

import { User } from "@prisma/client";
import { type ColumnDef } from "@tanstack/react-table";

import { ColumnHeader } from "@/app/(dashboard)/users/components/data-table/column-header";
import { RowActions } from "@/app/(dashboard)/users/components/data-table/row-actions";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <ColumnHeader column={column} title="Name" />,
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
    accessorKey: "role",
    header: ({ column }) => <ColumnHeader column={column} title="Role" />,
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <div className="text-right">
          <RowActions user={row.original} />
        </div>
      );
    },
  },
];
