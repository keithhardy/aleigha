import { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageHeader } from "@/components/page-header";
import { pagesConfig } from "@/config/pages";
import { prisma } from "@/lib/prisma-client";

import UpdateUserForm from "./form";

export const metadata: Metadata = {
  title: pagesConfig.userUpdate.metadata.title,
};

export default async function UpdateUser({ params }: { params: Promise<{ id: string }> }) {
  const user = await prisma.user.findFirst({
    where: {
      id: decodeURIComponent((await params).id),
    },
    include: {
      clients: true,
    },
  });
  const clients = await prisma.client.findMany();

  if (!user) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-screen-xl flex-grow p-6">
      <PageHeader config={pagesConfig.userUpdate} />
      <UpdateUserForm user={user} clients={clients} />
    </div>
  );
}
