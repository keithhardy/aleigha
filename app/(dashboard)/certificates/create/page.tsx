import { Metadata } from "next";
import { redirect } from "next/navigation";

import { PageHeader } from "@/components/page-header";
import { pagesConfig } from "@/config/pages";
import { auth0 } from "@/lib/auth/auth0-client";
import { prisma } from "@/lib/db/prisma-client";

import { CreateCertificateForm } from "./form";

export const metadata: Metadata = {
  title: pagesConfig.certificateCreate.metadata.title,
};

export default async function CreateCertificate() {
  const session = await auth0.getSession();
  const currentUser = session?.user;

  if (!currentUser) {
    redirect("/auth/login");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: currentUser.email,
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
    <div className="container mx-auto p-6">
      <PageHeader config={pagesConfig.certificateCreate} />

      <CreateCertificateForm currentUser={user!} clients={clients} />
    </div>
  );
}
