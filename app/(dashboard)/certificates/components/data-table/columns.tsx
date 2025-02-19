'use client';

import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { ColumnHeader } from './column-header';
import { RowActions } from './row-actions';

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'serial',
    header: ({ column }) => <ColumnHeader column={column} title="Serial" />,
  },
  {
    accessorKey: 'type',
    header: ({ column }) => <ColumnHeader column={column} title="Type" />,
  },
  {
    accessorKey: 'client.name',
    header: ({ column }) => <ColumnHeader column={column} title="Client" />,
  },
  {
    accessorKey: 'property.uprn',
    header: ({ column }) => <ColumnHeader column={column} title="Property Reference" />,
  },
  {
    accessorKey: 'property.address.streetAddress',
    header: ({ column }) => <ColumnHeader column={column} title="Address" />,
  },
  {
    accessorKey: 'property.address.postCode',
    header: ({ column }) => <ColumnHeader column={column} title="Postcode" />,
  },
  {
    accessorKey: 'startDate',
    header: ({ column }) => <ColumnHeader column={column} title="Date" />,
    cell: ({ getValue }) => {
      const date = getValue() as string | undefined;

      if (date) {
        return format(new Date(date), 'dd/MM/yy');
      }
      return 'N/A';
    },
  },
  {
    accessorKey: 'creator.name',
    header: ({ column }) => <ColumnHeader column={column} title="Operative" />,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <ColumnHeader column={column} title="Status" />,
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return (
        <div className="text-right">
          <RowActions certificate={row.original} />
        </div>
      );
    },
  },
];
