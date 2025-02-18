import { notFound } from 'next/navigation';

import { Header, HeaderDescription, HeaderGroup, Heading } from '@/components/page-header';
import { prisma } from '@/lib/prisma';

import { ClientDeleteForm } from '@/app/(dashboard)/clients/[id]/delete/form';

export default async function ClientDelete({ params }: { params: Promise<{ id: string }> }) {
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
          <Heading>Delete Client</Heading>
          <HeaderDescription>
            You are about to delete {client.name}. This action is permanent and cannot be undone.
          </HeaderDescription>
        </HeaderGroup>
      </Header>

      <ClientDeleteForm client={client!} />
    </>
  );
}
