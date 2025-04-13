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
  type Row,
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
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { cn } from "@/lib/utils";

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
  columns: ColumnDef<User, unknown>[];
  initialData: {
    users: User[];
    totalCount: number;
    roleCounts: Record<UserRole, number>;
  };
}

export function DataTable({ columns, initialData }: DataTableProps) {
  const [data, setData] = useState(initialData);

  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const [sorting, setSorting] = useState<SortingState>([]);

  const [searchQuery, setSearchQuery] = useState("");

  const [roleFilter, setRoleFilter] = useState<$Enums.UserRole[]>([]);
  const [selectRoleFilterOpen, setSelectRoleFilterOpen] = useState(false);

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
      const result = await getPaginatedUsers({
        page: pageIndex + 1,
        pageSize,
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

  const getCellById = (row: Row<unknown>, columnId: string) =>
    row.getVisibleCells().find((cell) => cell.column.id === columnId);

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
                <DialogSheet
                  open={selectRoleFilterOpen}
                  onOpenChange={setSelectRoleFilterOpen}
                >
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
                                  setPageIndex(0);
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
                                {UserRole[role]}
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
              <ScrollBar orientation="horizontal" className="hidden" />
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
      <Card className="hidden rounded-md shadow-none md:block">
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
        <CardFooter className="flex justify-between space-x-4 rounded-b-md border-t bg-muted py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {selectedRows.length} of {data.totalCount} row(s) selected.
          </div>
          <p className="text-sm text-muted-foreground">Rows per page</p>
          <Select
            value={`${pageSize}`}
            onValueChange={(value) => {
              setPageSize(Number(value));
              setPageIndex(0);
            }}
          >
            <SelectTrigger className="h-[32px] w-[70px] bg-background">
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
            size="sm"
            onClick={() => setPageIndex((prev) => Math.max(prev - 1, 0))}
            disabled={pageIndex === 0}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPageIndex((prev) => prev + 1)}
            disabled={pageIndex + 1 >= Math.ceil(data.totalCount / pageSize)}
          >
            Next
          </Button>
        </CardFooter>
      </Card>
      <div className="flex flex-col gap-4 md:hidden">
        {table.getRowModel().rows.map((row: Row<unknown>) => (
          <Card key={row.id} className="rounded-md shadow-none">
            <CardHeader className="relative">
              <CardDescription>
                {getCellById(row, "role")
                  ? flexRender(
                      getCellById(row, "role")!.column.columnDef.cell,
                      getCellById(row, "role")!.getContext(),
                    )
                  : null}
              </CardDescription>
              <CardTitle
                className="text-2xl font-semibold tabular-nums"
                id={`card-${row.id}`}
              >
                {getCellById(row, "name")
                  ? flexRender(
                      getCellById(row, "name")!.column.columnDef.cell,
                      getCellById(row, "name")!.getContext(),
                    )
                  : null}
              </CardTitle>
              <div className="absolute right-4 top-4">
                {getCellById(row, "actions")
                  ? flexRender(
                      getCellById(row, "actions")!.column.columnDef.cell,
                      getCellById(row, "actions")!.getContext(),
                    )
                  : null}
              </div>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                {getCellById(row, "email")
                  ? flexRender(
                      getCellById(row, "email")!.column.columnDef.cell,
                      getCellById(row, "email")!.getContext(),
                    )
                  : null}
              </div>
              <div className="text-muted-foreground">
                {getCellById(row, "phone")
                  ? flexRender(
                      getCellById(row, "phone")!.column.columnDef.cell,
                      getCellById(row, "phone")!.getContext(),
                    )
                  : null}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
