import { Metadata } from "next";

import { columns } from "@/app/(dashboard)/clients/components/data-table/columns";
import { DataTable } from "@/app/(dashboard)/clients/components/data-table/data-table";
import { PageHeader } from "@/components/page-header";
import { config } from "@/lib/config";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: config.clients.metadata.title,
};

export default async function Clients() {
  const clients = await prisma.client.findMany({
    include: {
      address: true,
    },
  });

  return (
    <div className="container mx-auto max-w-screen-xl flex-grow p-6">
      <PageHeader config={config.clients} />
      <DataTable columns={columns} data={clients} />
    </div>
  );
}
