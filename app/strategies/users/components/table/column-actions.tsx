"use client";

import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { type Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

import { User } from "./types";

interface ColumnActionsProps {
  row: Row<User>;
}

export function ColumnActions({ row }: ColumnActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem asChild>
          <Link href={`/users/${row.original.id}/update`}>Edit</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/users/${row.original.id}/delete`}>Delete</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
