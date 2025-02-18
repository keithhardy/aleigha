import { Header, HeaderDescription, HeaderGroup, Heading } from "@/components/page-header";

import { notFound } from 'next/navigation';

import { ClientUpdateForm } from '@/app/(dashboard)/clients/[id]/update/form';
import { prisma } from '@/lib/prisma';

export default async function ClientUpdate({ params }: { params: Promise<{ id: string }> }) {
  const client = await prisma.client.findUnique({
    where: {
      id: (await params).id,
    },
    include: {
      address: true,
    },
  });

  if (!client) {
    notFound();
  }

  return (
    <>
      <Header>
        <HeaderGroup>
          <Heading>Update Client</Heading>
          <HeaderDescription>
            View and edit the client's details. Update any information as needed and save your changes.
          </HeaderDescription>
        </HeaderGroup>
      </Header>

      <ClientUpdateForm client={client} />
    </>
  );
}
