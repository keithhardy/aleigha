import { Metadata } from "next";
import { redirect } from "next/navigation";

import { getAuth0User } from "@/auth0";
import { PageHeader } from "@/components/page-header";
import { pagesConfig } from "@/config/pages";
import { prisma } from "@/prisma";

import { CreateCertificateForm } from "./form";

export const metadata: Metadata = {
  title: pagesConfig.certificateCreate.metadata.title,
};

export default async function CreateCertificate() {
  const currentUser = await getAuth0User();

  if (!currentUser) {
    redirect("/auth/login");
  }

  const user = await prisma.user.findUnique({
    where: {
      auth0Id: currentUser,
    },
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

      <CreateCertificateForm currentUser={user!} clients={clients} />
    </div>
  );
}
