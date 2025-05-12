import { Metadata } from "next";
import { notFound } from "next/navigation";

import { DeletePropertyForm } from "@/app/(dashboard)/properties/[id]/delete/form";
import { PageHeader } from "@/components/page-header";
import { pagesConfig } from "@/config/pages";
import { prisma } from "@/lib/db/prisma-client";

export const metadata: Metadata = {
  title: pagesConfig.propertyDelete.metadata.title,
};

export async function generateStaticParams() {
  const properties = await prisma.property.findMany({
    select: { id: true },
  });

  return properties.map((property) => ({
    id: property.id,
  }));
}

export default async function DeleteProperty({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
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

  return (
    <div className="container mx-auto p-6">
      <PageHeader config={pagesConfig.propertyDelete} />
      <DeletePropertyForm property={property} />
    </div>
  );
}
