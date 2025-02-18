'use client';

import { ColumnDef } from '@tanstack/react-table';

import { ColumnHeader } from './column-header';
import { RowActions } from './row-actions';

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'type',
    header: ({ column }) => <ColumnHeader column={column} title="Type" />,
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
    accessorKey: 'date',
    header: ({ column }) => <ColumnHeader column={column} title="Date" />,
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
