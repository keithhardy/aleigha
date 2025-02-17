'use client';

import { User } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';

import { ColumnHeader } from '@/app/(dashboard)/users/components/data-table/column-header';
import { RowActions } from '@/app/(dashboard)/users/components/data-table/row-actions';

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => <ColumnHeader column={column} title="Name" />,
  },
  {
    accessorKey: 'email',
    header: ({ column }) => <ColumnHeader column={column} title="Email" />,
  },
  {
    accessorKey: 'position',
    header: ({ column }) => <ColumnHeader column={column} title="Position" />,
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return (
        <div className="text-right">
          <RowActions user={row.original} />
        </div>
      );
    },
  },
];
