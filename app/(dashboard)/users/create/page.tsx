import { Metadata } from "next";

import { PageHeader } from "@/components/page-header";
import { config } from "@/lib/config";
import { prisma } from "@/lib/prisma";

import CreateUserForm from "./form";

export const metadata: Metadata = {
  title: config.userCreate.metadata.title,
};

export default async function CreateUser() {
  const clients = await prisma.client.findMany();

  return (
    <div className="container mx-auto max-w-screen-xl flex-grow p-6">
      <PageHeader config={config.userCreate} />
      <CreateUserForm clients={clients} />
    </div>
  );
}
