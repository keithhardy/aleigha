"use client";

import { EICRStatus } from "@prisma/client";
import { type ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import { ColumnHeader } from "./column-header";
import { RowActions } from "./row-actions";

export const columns: ColumnDef<{
  id: string;
  type: string;
  serial: string;
  status: EICRStatus | null;
  startDate: Date | null;
  endDate: Date | null;
  client: { name: string };
  property: {
    uprn: string;
    address: { streetAddress: string | null; postCode: string | null };
  };
  creator: { name: string };
}>[] = [
  {
    accessorKey: "serial",
    header: ({ column }) => <ColumnHeader column={column} title="Serial No." />,
  },
  {
    accessorKey: "type",
    header: ({ column }) => <ColumnHeader column={column} title="Type" />,
    cell: ({ getValue }) => {
      const value = getValue() as string;
      const initials = value
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase();
      return initials;
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    accessorFn: (row) => row.client?.name,
    id: "client",
    header: ({ column }) => <ColumnHeader column={column} title="Client" />,
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: "property.uprn",
    id: "UPRN",
    header: ({ column }) => <ColumnHeader column={column} title="UPRN" />,
  },
  {
    accessorKey: "property.address.streetAddress",
    id: "Address",
    header: ({ column }) => <ColumnHeader column={column} title="Address" />,
  },
  {
    accessorKey: "property.address.postCode",
    id: "Postcode",
    header: ({ column }) => <ColumnHeader column={column} title="Postcode" />,
  },
  {
    accessorKey: "startDate",
    id: "Date",
    header: ({ column }) => <ColumnHeader column={column} title="Date" />,
    cell: ({ getValue }) => {
      const date = getValue() as string | undefined;

      if (date) {
        return format(new Date(date), "dd/MM/yy");
      }
      return "N/A";
    },
    filterFn: (row, id, value) => {
      const rowDate = new Date(row.getValue(id));

      const startDate = value?.from ? new Date(value.from) : null;
      const endDate = value?.to ? new Date(value.to) : null;

      if (!rowDate || isNaN(rowDate.getTime())) {
        return false;
      }

      if (startDate && endDate) {
        return rowDate >= startDate && rowDate <= endDate;
      }

      if (startDate) {
        return rowDate >= startDate;
      }

      if (endDate) {
        return rowDate <= endDate;
      }

      return true;
    },
  },
  {
    accessorFn: (row) => row.creator?.name,
    id: "creator",
    header: ({ column }) => <ColumnHeader column={column} title="Operative" />,
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: "status",
    header: ({ column }) => <ColumnHeader column={column} title="Status" />,
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <div className="text-right">
          <RowActions electricalInstallationConditionReport={row.original} />
        </div>
      );
    },
  },
];
