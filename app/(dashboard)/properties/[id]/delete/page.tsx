import { Metadata } from "next";
import { notFound } from "next/navigation";

import { DeletePropertyForm } from "@/app/(dashboard)/properties/[id]/delete/form";
import { PageHeader } from "@/components/page-header";
import { prisma } from "@/lib/prisma-client";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: siteConfig.propertyDelete.metadata.title,
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
    <div className="container mx-auto max-w-screen-xl flex-grow p-6">
      <PageHeader siteConfig={siteConfig.propertyDelete} />
      <DeletePropertyForm property={property} />
    </div>
  );
}
