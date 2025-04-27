import { Metadata } from "next";

import { PageHeader } from "@/components/page-header";
import { pagesConfig } from "@/config/pages";
import { auth0 } from "@/lib/auth0-client";
import { prisma } from "@/lib/prisma-client";

import { CreateCertificateForm } from "./form";

export const metadata: Metadata = {
  title: pagesConfig.certificateCreate.metadata.title,
};

export default async function CreateCertificate() {
  const session = await auth0.getSession();

  if (!session || !session.user) {
    return null;
  }

  const currentUser = await prisma.user.findUnique({
    where: { auth0Id: session.user.sub },
  });

  const clients = await prisma.client.findMany({
    include: {
      property: {
        include: {
          address: true,
        },
      },
    },
  });

  return (
    <div className="container mx-auto max-w-screen-xl flex-grow p-6">
      <PageHeader config={pagesConfig.certificateCreate} />

      <CreateCertificateForm currentUser={currentUser!} clients={clients} />
    </div>
  );
}
