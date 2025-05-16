import {
  type ColumnDef,
  flexRender,
  type Table as ReactTable,
  type Row,
} from "@tanstack/react-table";
import { Fragment } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TableContentProps<TData, TValue> {
  table: ReactTable<TData>;
  columns: ColumnDef<TData, TValue>[];
  renderExpandedRow?: ({ row }: { row: Row<TData> }) => React.ReactNode;
}

export function TableContent<TData, TValue>({
  table,
  columns,
  renderExpandedRow,
}: TableContentProps<TData, TValue>) {
  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(header.column.columnDef.header, header.getContext())}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <Fragment key={row.id}>
              <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
              {renderExpandedRow && row.getIsExpanded() && (
                <TableRow>
                  <TableCell colSpan={columns.length}>{renderExpandedRow({ row })}</TableCell>
                </TableRow>
              )}
            </Fragment>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
