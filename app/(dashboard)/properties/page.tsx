import { Metadata } from "next";

import { columns } from "@/app/(dashboard)/properties/components/data-table/columns";
import { DataTable } from "@/app/(dashboard)/properties/components/data-table/data-table";
import { PageHeader } from "@/components/page-header";
import { prisma } from "@/lib/prisma-client";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: siteConfig.properties.metadata.title,
};

export default async function Properties() {
  const properties = await prisma.property.findMany({
    include: {
      address: true,
      client: true,
    },
  });

  return (
    <div className="container mx-auto max-w-screen-xl flex-grow p-6">
      <PageHeader config={siteConfig.properties} />
      <DataTable columns={columns} data={properties} />
    </div>
  );
}
