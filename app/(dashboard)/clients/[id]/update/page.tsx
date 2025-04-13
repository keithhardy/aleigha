import { Metadata } from "next";
import { notFound } from "next/navigation";

import { UpdateClientForm } from "@/app/(dashboard)/clients/[id]/update/form";
import {
  Header,
  HeaderDescription,
  HeaderGroup,
  Heading,
} from "@/components/page-header";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Reiyen – Update Client",
};

export default async function UpdateClient({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
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
    <div className="container mx-auto max-w-screen-lg">
      <Header>
        <HeaderGroup>
          <Heading>Update Client</Heading>
          <HeaderDescription>
            View and edit the client&apos;s details. Update any information as
            needed and save your changes.
          </HeaderDescription>
        </HeaderGroup>
      </Header>

      <UpdateClientForm client={client} />
    </div>
  );
}
