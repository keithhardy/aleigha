import { columns } from '@/app/(dashboard)/properties/components/data-table/columns';
import { DataTable } from '@/app/(dashboard)/properties/components/data-table/data-table';
import { Header, HeaderDescription, HeaderGroup, Heading } from "@/components/page-header";
import { prisma } from '@/lib/prisma';


export default async function Properties() {
  const properties = await prisma.property.findMany({
    include: {
      address: true,
    },
  });

  return (
    <>
      <Header>
        <HeaderGroup>
          <Heading>View Properties</Heading>
          <HeaderDescription>
            Manage your properties. Browse a table of properties and find links to add, update, or remove property records.
          </HeaderDescription>
        </HeaderGroup>
      </Header>

      <DataTable columns={columns} data={properties} />
    </>
  );
}
