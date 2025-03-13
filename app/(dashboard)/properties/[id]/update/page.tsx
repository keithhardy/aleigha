import { notFound } from "next/navigation";

import { UpdatePropertyForm } from "@/app/(dashboard)/properties/[id]/update/form";
import { Header, HeaderDescription, HeaderGroup, Heading } from "@/components/page-header";
import { prisma } from "@/lib/prisma";

export default async function UpdateProperty({ params }: { params: Promise<{ id: string }> }) {
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
    <div className="container mx-auto max-w-screen-lg">
      <Header>
        <HeaderGroup>
          <Heading>Update Property</Heading>
          <HeaderDescription>Edit the details of the selected property below. Make sure to review the information carefully before saving any changes.</HeaderDescription>
        </HeaderGroup>
      </Header>

      <UpdatePropertyForm property={property} clients={clients} />
    </div>
  );
}
