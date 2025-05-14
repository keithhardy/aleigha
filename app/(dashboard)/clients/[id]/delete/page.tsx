import { Metadata } from "next";
import { notFound } from "next/navigation";

import { DeleteClientForm } from "@/app/(dashboard)/clients/[id]/delete/form";
import { PageHeader } from "@/components/page-header";
import { pagesConfig } from "@/config/pages";
import { prisma } from "@/lib/db/prisma-client";

export const metadata: Metadata = {
  title: pagesConfig.clientDelete.metadata.title,
};

export default async function DeleteClient({ params }: { params: Promise<{ id: string }> }) {
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
    <div className="container mx-auto p-6">
      <PageHeader config={pagesConfig.clientDelete} />
      <DeleteClientForm client={client!} />
    </div>
  );
}
