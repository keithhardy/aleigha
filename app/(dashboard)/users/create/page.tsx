import { Metadata } from "next";

import { PageHeader } from "@/components/page-header";
import { pagesConfig } from "@/config/pages";
import { prisma } from "@/lib/prisma-client";

import CreateUserForm from "./form";

export const metadata: Metadata = {
  title: pagesConfig.userCreate.metadata.title,
};

export default async function CreateUser() {
  const clients = await prisma.client.findMany();

  return (
    <div className="container mx-auto max-w-screen-xl flex-grow p-6">
      <PageHeader config={pagesConfig.userCreate} />
      <CreateUserForm clients={clients} />
    </div>
  );
}
