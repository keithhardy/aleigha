import { MoveLeft } from "lucide-react";
import Link from "next/link";

import { columns } from "@/app/(dashboard)/certificates/components/data-table/columns";
import { DataTable } from "@/app/(dashboard)/certificates/components/data-table/data-table";
import { Header, HeaderGroup, Heading } from "@/components/page-header";
import { prisma } from "@/lib/prisma";

export default async function Certificates() {
  const certificates =
    await prisma.electricalInstallationConditionReport.findMany({
      select: {
        id: true,
        type: true,
        serial: true,
        status: true,
        startDate: true,
        endDate: true,
        client: {
          select: {
            name: true,
          },
        },
        property: {
          select: {
            uprn: true,
            address: {
              select: {
                streetAddress: true,
                postCode: true,
              },
            },
          },
        },
        creator: {
          select: {
            name: true,
          },
        },
      },
    });

  return (
    <div className="container mx-auto max-w-screen-xl flex-grow p-6">
      <Header>
        <HeaderGroup>
          <Link
            href={"/"}
            className="inline-flex items-center text-sm font-semibold"
          >
            <MoveLeft size={22} className="mr-2" />
            <span>Back to Dashboard</span>
          </Link>
          <Heading>View Certificates</Heading>
        </HeaderGroup>
      </Header>

      <DataTable columns={columns} data={certificates} />
    </div>
  );
}
