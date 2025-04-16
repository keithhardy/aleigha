import { Metadata } from "next";
import { notFound } from "next/navigation";

import { UpdatePropertyForm } from "@/app/(dashboard)/properties/[id]/update/form";
import { PageHeader } from "@/components/page-header";
import { pagesConfig } from "@/config/pages";
import { prisma } from "@/lib/prisma-client";

export const metadata: Metadata = {
  title: pagesConfig.propertyUpdate.metadata.title,
};

export default async function UpdateProperty({
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

  const clients = await prisma.client.findMany();

  return (
    <div className="container mx-auto max-w-screen-xl flex-grow p-6">
      <PageHeader config={pagesConfig.propertyUpdate} />
      <UpdatePropertyForm property={property} clients={clients} />
    </div>
  );
}
