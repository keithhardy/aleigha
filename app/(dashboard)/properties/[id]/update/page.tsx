import { notFound } from 'next/navigation';

import { PropertyUpdateForm } from '@/app/(dashboard)/properties/[id]/update/form';
import { prisma } from '@/lib/prisma';

export default async function PropertyUpdatePage({ params }: { params: Promise<{ id: string }> }) {
  const property = await prisma.property.findUnique({
    where: {
      id: (await params).id,
    },
    include: {
      address: true,
    },
  });

  if (!property) {
    notFound();
  }

  const clients = await prisma.client.findMany();

  return (
    <>
      <PropertyUpdateForm property={property} />
    </>
  );
}
