"use client";

import { Address, Client, Property } from "@prisma/client";
import { type ColumnDef } from "@tanstack/react-table";

import { ColumnHeader } from "@/app/(dashboard)/properties/components/data-table/column-header";
import { RowActions } from "@/app/(dashboard)/properties/components/data-table/row-actions";

export const columns: ColumnDef<
  Property & {
    address: Address | null;
    client: Client | null;
  }
>[] = [
  {
    accessorKey: "uprn",
    id: "UPRN",
    header: ({ column }) => <ColumnHeader column={column} title="UPRN" />,
  },
  {
    accessorFn: (row) => row.client?.name,
    id: "client",
    header: ({ column }) => <ColumnHeader column={column} title="Client" />,
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: "occupier",
    header: ({ column }) => <ColumnHeader column={column} title="Occupier" />,
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: "address.streetAddress",
    id: "Address",
    header: ({ column }) => <ColumnHeader column={column} title="Address" />,
  },
  {
    accessorKey: "address.postCode",
    id: "Postcode",
    header: ({ column }) => <ColumnHeader column={column} title="Postcode" />,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <div className="text-right">
          <RowActions property={row.original} />
        </div>
      );
    },
  },
];
