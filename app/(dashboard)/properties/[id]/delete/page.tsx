import { notFound } from 'next/navigation';

import { PropertyDeleteForm } from '@/app/(dashboard)/properties/[id]/delete/form';
import { Header, HeaderDescription, HeaderGroup, Heading } from "@/components/page-header";
import { prisma } from '@/lib/prisma';

export async function generateStaticParams() {
  const properties = await prisma.property.findMany({
    select: { id: true },
  });

  return properties.map((property) => ({
    id: property.id,
  }));
}

export default async function PropertyDeletePage({ params }: { params: Promise<{ id: string }> }) {
  const property = await prisma.property.findUnique({
    where: {
      id: (await params).id,
    },
    include: {
      address: true
    }
  });

  if (!property) {
    notFound();
  }

  return (
    <>
      <Header>
        <HeaderGroup>
          <Heading>Delete Property</Heading>
          <HeaderDescription>
            Are you sure you want to delete {property.address?.streetAddress}? This action cannot be undone.
          </HeaderDescription>
        </HeaderGroup>
      </Header>

      <PropertyDeleteForm property={property!} />
    </>
  );
}
