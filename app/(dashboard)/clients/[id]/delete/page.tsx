import { Metadata } from "next";
import { notFound } from "next/navigation";

import { DeleteClientForm } from "@/app/(dashboard)/clients/[id]/delete/form";
import {
  Header,
  HeaderDescription,
  HeaderGroup,
  Heading,
} from "@/components/page-header";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Reiyen – Delete Client",
};

export default async function DeleteClient({
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
          <Heading>Delete Client</Heading>
          <HeaderDescription>
            You are about to delete {client.name}. This action is permanent and
            cannot be undone.
          </HeaderDescription>
        </HeaderGroup>
      </Header>

      <DeleteClientForm client={client!} />
    </div>
  );
}
