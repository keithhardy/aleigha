"use client";

import {
  Address,
  Client,
  ElectricalInstallationConditionReport,
  Property,
} from "@prisma/client";
import { type ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type ElectricalInstalationConditionReportWithRelations =
  ElectricalInstallationConditionReport & {
    client: Client | null;
    property: Property & {
      address: Address | null;
    };
  };

export const columns: ColumnDef<ElectricalInstalationConditionReportWithRelations>[] =
  [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          className="ml-2 mr-4"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          className="ml-2 mr-4"
        />
      ),
    },
    {
      accessorKey: "client.name",
      id: "client.name",
      header: "Client",
      filterFn: (row, id, value) => value.includes(row.getValue(id)),
    },
    {
      accessorKey: "serial",
      header: "Serial Number",
    },
    {
      accessorKey: "type",
      header: "Type",
      filterFn: (row, id, value) => value.includes(row.getValue(id)),
    },
    {
      accessorKey: "property.address.streetAddress",
      header: "Address",
    },
    {
      accessorKey: "property.address.postCode",
      header: "Postcode",
    },
    {
      accessorKey: "startDate",
      header: "Date",
      cell: ({ getValue }) => {
        const date = getValue() as string | undefined;

        if (date) {
          return format(new Date(date), "dd/MM/yy");
        }
        return "N/A";
      },
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const original = row.original;

        return (
          <div className="flex justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="mr-2 data-[state=open]:bg-accent"
                >
                  <MoreHorizontal />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link
                    href={`/certificates/eicr/${original.id}/update/details-of-the-contractor-client-installation`}
                  >
                    Edit
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`/certificates/eicr/${original.id}/delete`}>
                    Delete
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];
