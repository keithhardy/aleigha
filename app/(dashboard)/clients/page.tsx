import { Header, HeaderDescription, HeaderGroup, Heading } from "@/components/page-header";
import { prisma } from '@/lib/prisma';

import { columns } from '@/app/(dashboard)/clients/components/data-table/columns';
import { DataTable } from '@/app/(dashboard)/clients/components/data-table/data-table';

export default async function Clients() {
  const clients = await prisma.client.findMany({
    include: {
      address: true,
    },
  });

  return (
    <>
      <Header>
        <HeaderGroup>
          <Heading>View Clients</Heading>
          <HeaderDescription>
            Manage your clients. Browse a table of clients and find links to add, update, or remove client records.
          </HeaderDescription>
        </HeaderGroup>
      </Header>

      <DataTable columns={columns} data={clients} />
    </>
  );
}
