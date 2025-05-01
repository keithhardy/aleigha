"use client";

import { type Table } from "@tanstack/react-table";
import { Upload, UserPlus2, XCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { FacetedFilter } from "@/components/data-table/faceted-filter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface ToolbarProps<TData> {
  table: Table<TData>;
  facets: Record<string, Record<string, number>>;
}

export function Toolbar<TData>({ table, facets }: ToolbarProps<TData>) {
  const [isDownloadLoading, setIsDownloadLoading] = useState(false);

  const handleDownload = async () => {
    setIsDownloadLoading(true);
    try {
      const response = await fetch("/api/download/user-export", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Object.keys(table.getState().rowSelection)),
      });

      if (!response.ok) {
        throw new Error("Failed to generate CSV");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "property-export.csv";
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading CSV:", error);
    } finally {
      setIsDownloadLoading(false);
    }
  };

  const isFiltered =
    table.getState().columnFilters.length > 0 ||
    table.getState().globalFilter !== "";

  const roleColumn = table.getColumn("role");
  const roleOptions = facets["role"]
    ? Object.entries(facets["role"]).map(([value, number]) => ({
        label: value,
        value: value,
        number: number,
      }))
    : [];

  return (
    <>
      <div className="flex flex-col justify-between gap-2 md:flex-row">
        <div className="flex flex-grow flex-col gap-2 md:flex-row">
          <Input
            placeholder="Search..."
            value={(table.getState().globalFilter as string) ?? ""}
            onChange={(e) => table.setGlobalFilter(e.target.value)}
            className="h-[32px] max-w-[250px]"
          />
          <div className="flex w-full">
            <ScrollArea className="w-1 flex-1">
              <div className="flex gap-2">
                {roleColumn && (
                  <FacetedFilter
                    column={roleColumn}
                    title="Role"
                    options={roleOptions}
                  />
                )}
                {isFiltered && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      table.resetColumnFilters();
                      table.setGlobalFilter("");
                    }}
                  >
                    <XCircle />
                    Clear
                  </Button>
                )}{" "}
              </div>
              <ScrollBar orientation="horizontal" className="hidden md:flex" />
            </ScrollArea>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownload}
            disabled={
              isDownloadLoading ||
              Object.keys(table.getState().rowSelection).length === 0
            }
          >
            <Upload />
            Export
          </Button>
          <Link href="/users/create">
            <Button variant="outline" size="sm">
              <UserPlus2 />
              Create
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
