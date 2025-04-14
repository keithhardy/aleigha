import { Metadata } from "next";

import { PageHeader } from "@/components/page-header";
import { prisma } from "@/lib/prisma-client";
import { siteConfig } from "@/lib/site-config";

import CreateUserForm from "./form";

export const metadata: Metadata = {
  title: siteConfig.userCreate.metadata.title,
};

export default async function CreateUser() {
  const clients = await prisma.client.findMany();

  return (
    <div className="container mx-auto max-w-screen-xl flex-grow p-6">
      <PageHeader siteConfig={siteConfig.userCreate} />
      <CreateUserForm clients={clients} />
    </div>
  );
}
