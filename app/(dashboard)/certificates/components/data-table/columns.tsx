"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import { ColumnHeader } from "./column-header";
import { RowActions } from "./row-actions";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "serial",
    header: ({ column }) => <ColumnHeader column={column} title="Serial" />,
  },
  {
    accessorKey: "type",
    header: ({ column }) => <ColumnHeader column={column} title="Type" />,
  },
  {
    accessorFn: (row) => row.client?.name,
    id: "client",
    header: ({ column }) => <ColumnHeader column={column} title="Client" />,
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: "property.uprn",
    header: ({ column }) => (
      <ColumnHeader column={column} title="Property Reference" />
    ),
  },
  {
    accessorKey: "property.address.streetAddress",
    header: ({ column }) => <ColumnHeader column={column} title="Address" />,
  },
  {
    accessorKey: "property.address.postCode",
    header: ({ column }) => <ColumnHeader column={column} title="Postcode" />,
  },
  {
    accessorKey: "startDate",
    header: ({ column }) => <ColumnHeader column={column} title="Start Date" />,
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
    accessorKey: "endDate",
    header: ({ column }) => <ColumnHeader column={column} title="End Date" />,
    cell: ({ getValue }) => {
      const date = getValue() as string | undefined;

      if (date) {
        return format(new Date(date), "dd/MM/yy");
      }
      return "N/A";
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
