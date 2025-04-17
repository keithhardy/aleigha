"use client";

import { $Enums, UserRole } from "@prisma/client";
import { CheckIcon } from "@radix-ui/react-icons";
import {
  type ColumnDef,
  useReactTable,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  type SortingState,
  getSortedRowModel,
  type OnChangeFn,
  type RowSelectionState,
} from "@tanstack/react-table";
import { ListFilterPlus, UserPlus2, XCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import {
  DialogSheet,
  DialogSheetContent,
  DialogSheetTitle,
  DialogSheetTrigger,
} from "@/components/dialog-sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

import { getUsers } from "./get-users";

type User = {
  name: string;
  id: string;
  auth0Id: string;
  email: string;
  phone: string;
  signature: string | null;
  role: $Enums.UserRole;
  createdAt: Date;
  updatedAt: Date;
};

type DataTableProps = {
  columns: ColumnDef<User>[];
  initialData: {
    users: User[];
    totalCount: number;
    roleCounts: Record<UserRole, number>;
  };
};

export function DataTable({ columns, initialData }: DataTableProps) {
  const [data, setData] = useState(initialData);

  const [pageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const [sorting, setSorting] = useState<SortingState>([]);

  const [searchQuery, setSearchQuery] = useState("");

  const [roleFilter, setRoleFilter] = useState<$Enums.UserRole[]>([]);

  const rowSelection = useMemo(() => {
    const idSet = new Set(selectedRows);
    return data.users.reduce<Record<number, boolean>>((acc, user, index) => {
      if (idSet.has(user.id)) acc[index] = true;
      return acc;
    }, {});
  }, [data.users, selectedRows]);

  const handleRowSelectionChange: OnChangeFn<RowSelectionState> = (
    updaterOrValue,
  ) => {
    const newSelection =
      typeof updaterOrValue === "function"
        ? updaterOrValue(rowSelection)
        : (updaterOrValue ?? {});

    const selectedIds = Object.entries(newSelection)
      .filter(([, selected]) => selected)
      .map(([index]) => data.users[Number(index)]?.id)
      .filter(Boolean);

    const currentPageIds = new Set(data.users.map((user) => user.id));

    setSelectedRows((prev) => {
      const retained = prev.filter((id) => !currentPageIds.has(id));
      return Array.from(new Set([...retained, ...selectedIds]));
    });
  };

  const toggleRoleSelection = (role: $Enums.UserRole) => {
    setRoleFilter((prevRoles) =>
      prevRoles.includes(role)
        ? prevRoles.filter((r) => r !== role)
        : [...prevRoles, role],
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      const sort = sorting[0];
      const result = await getUsers({
        quantity: pageSize,
        sortBy: sort?.id,
        sortOrder: sort?.desc ? "desc" : "asc",
        searchQuery: searchQuery,
        roles: roleFilter,
      });

      setData(result);
    };

    fetchData();
  }, [pageIndex, pageSize, sorting, searchQuery, roleFilter]);

  const table = useReactTable({
    data: data.users,
    columns,
    state: {
      rowSelection,
      sorting,
    },
    manualPagination: true,
    manualSorting: true,
    onRowSelectionChange: handleRowSelectionChange,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col justify-between gap-2 md:flex-row">
        <div className="flex flex-grow flex-col gap-2 md:flex-row">
          <Input
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-[32px]"
          />
          <div className="flex w-full">
            <ScrollArea className="w-1 flex-1">
              <div className="flex gap-2">
                <DialogSheet>
                  <DialogSheetTrigger asChild>
                    <Button variant="outline" size="sm">
                      <ListFilterPlus />
                      Role
                      {roleFilter.length > 0 && (
                        <Badge variant="secondary">
                          {roleFilter.length} selected
                        </Badge>
                      )}
                    </Button>
                  </DialogSheetTrigger>
                  <DialogSheetContent className="p-0">
                    <DialogSheetTitle className="hidden" />
                    <Command className="pt-2">
                      <CommandInput placeholder="Search..." autoFocus={false} />
                      <CommandList className="scrollbar-hidden mt-1 border-t p-1">
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup>
                          {Object.keys(UserRole).map((key) => {
                            const role = key as $Enums.UserRole;
                            const count = initialData.roleCounts?.[role] ?? 0;

                            return (
                              <CommandItem
                                key={role}
                                value={role}
                                onSelect={() => {
                                  toggleRoleSelection(role);
                                }}
                              >
                                <div
                                  className={cn(
                                    "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                    roleFilter.includes(role)
                                      ? "bg-primary text-primary-foreground"
                                      : "opacity-50 [&_svg]:invisible",
                                  )}
                                >
                                  <CheckIcon />
                                </div>
                                {role}
                                <span className="ml-auto">{count}</span>
                              </CommandItem>
                            );
                          })}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </DialogSheetContent>
                </DialogSheet>
                {roleFilter.length > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setRoleFilter([])}
                  >
                    <XCircle />
                    Clear
                  </Button>
                )}
              </div>
              <ScrollBar orientation="horizontal" className="hidden md:flex" />
            </ScrollArea>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href="/users/create">
            <Button variant="outline" size="sm">
              <UserPlus2 />
              Create
            </Button>
          </Link>
        </div>
      </div>
      <Card className="rounded-md shadow-none">
        <div className="flex w-full">
          <ScrollArea className="w-1 flex-1">
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
                        <TableCell key={cell.id} className="whitespace-nowrap">
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
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
        <CardFooter className="flex justify-center space-x-4 rounded-b-md border-t bg-muted py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPageSize((prev) => Math.max(prev + 10, 0))}
            disabled={pageSize >= data.totalCount}
          >
            {pageSize >= data.totalCount ? "No more to load" : "Load more"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
