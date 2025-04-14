import { Metadata } from "next";

import { columns } from "@/app/(dashboard)/certificates/components/data-table/columns";
import { DataTable } from "@/app/(dashboard)/certificates/components/data-table/data-table";
import { PageHeader } from "@/components/page-header";
import { prisma } from "@/lib/prisma-client";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: siteConfig.certificates.metadata.title,
};

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
      <PageHeader config={siteConfig.certificates} />
      <DataTable columns={columns} data={certificates} />
    </div>
  );
}
