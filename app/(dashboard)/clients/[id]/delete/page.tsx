import { Metadata } from "next";
import { notFound } from "next/navigation";

import { DeleteClientForm } from "@/app/(dashboard)/clients/[id]/delete/form";
import { PageHeader } from "@/components/page-header";
import { prisma } from "@/lib/prisma-client";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: siteConfig.clientDelete.metadata.title,
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
    <div className="container mx-auto max-w-screen-xl flex-grow p-6">
      <PageHeader config={siteConfig.clientDelete} />
      <DeleteClientForm client={client!} />
    </div>
  );
}
