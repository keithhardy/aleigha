import { columns } from '@/app/(dashboard)/clients/components/data-table/columns';
import { DataTable } from '@/app/(dashboard)/clients/components/data-table/data-table';
import { prisma } from '@/lib/prisma';

export default async function Clients() {
  const clients = await prisma.client.findMany({
    include: {
      address: true,
    },
  });

  return (
    <>
      <DataTable columns={columns} data={clients} />
    </>
  );
}
