"use client";

import { $Enums } from "@prisma/client";
import {
  type ColumnDef,
  useReactTable,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  type SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { getPaginatedUsers } from "./get-paginated-users";

interface User {
  name: string;
  id: string;
  auth0Id: string;
  email: string;
  phone: string;
  signature: string | null;
  role: $Enums.UserRole;
  createdAt: Date;
  updatedAt: Date;
}

interface DataTableProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<User, any>[];
  initialData: {
    users: User[];
    totalCount: number;
  };
}

export function DataTable({ columns, initialData }: DataTableProps) {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [data, setData] = useState(initialData);
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);

  const [sorting, setSorting] = useState<SortingState>([]);

  const rowSelection = useMemo(() => {
    const selection: Record<number, boolean> = {};
    data.users.forEach((user, index) => {
      if (selectedUserIds.includes(user.id)) {
        selection[index] = true;
      }
    });
    return selection;
  }, [data.users, selectedUserIds]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleRowSelectionChange = (updater: any) => {
    const newSelection =
      typeof updater === "function" ? updater(rowSelection) : updater;

    const newlySelectedIds = Object.entries(newSelection)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .filter(([_, selected]) => selected)
      .map(([index]) => data.users[Number(index)].id);

    const currentPageIds = data.users.map((user) => user.id);

    const filtered = selectedUserIds.filter(
      (id) => !currentPageIds.includes(id),
    );

    setSelectedUserIds([...filtered, ...newlySelectedIds]);
  };

  useEffect(() => {
    const fetchData = async () => {
      const sort = sorting[0];
      const result = await getPaginatedUsers({
        page: pageIndex + 1,
        pageSize,
        sortBy: sort?.id,
        sortOrder: sort?.desc ? "desc" : "asc",
        searchQuery,
      });

      setData(result);
    };

    fetchData();
  }, [pageIndex, pageSize, sorting, searchQuery]);

  const table = useReactTable({
    data: data.users,
    columns,
    state: {
      pagination: {
        pageIndex,
        pageSize,
      },
      rowSelection,
      sorting,
    },
    manualPagination: true,
    manualSorting: true,
    onPaginationChange: (updater) => {
      const newPage =
        typeof updater === "function"
          ? updater({ pageIndex, pageSize })
          : updater;
      setPageIndex(newPage.pageIndex);
    },
    onRowSelectionChange: handleRowSelectionChange,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <Input
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-[150px] lg:w-[250px]"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Link href="/clients/create">
            <Button variant="outline">Create</Button>
          </Link>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="py-4 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center space-x-2">
        <div className="flex-1 text-sm text-muted-foreground">
          {selectedUserIds.length} of {data.totalCount} row(s) selected.
        </div>
        <p className="text-sm font-medium">Rows per page</p>
        <Select
          value={`${pageSize}`}
          onValueChange={(value) => {
            setPageSize(Number(value));
            setPageIndex(0);
          }}
        >
          <SelectTrigger className="w-[70px]">
            <SelectValue placeholder={pageSize} />
          </SelectTrigger>
          <SelectContent side="top" align="center">
            {[10, 30, 50, 100].map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          onClick={() => setPageIndex((prev) => Math.max(prev - 1, 0))}
          disabled={pageIndex === 0}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          onClick={() => setPageIndex((prev) => prev + 1)}
          disabled={pageIndex + 1 >= Math.ceil(data.totalCount / pageSize)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
