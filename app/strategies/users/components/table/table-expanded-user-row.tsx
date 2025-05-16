"use client";

import { type Row } from "@tanstack/react-table";

import { User } from "./table-types";

interface ExpandedUserRowProps {
  row: Row<User>;
}

export function ExpandedUserRow({ row }: ExpandedUserRowProps) {
  return <div>{JSON.stringify(row.original)}</div>;
}
