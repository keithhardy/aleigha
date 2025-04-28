import { Metadata } from "next";

import { PageHeader } from "@/components/page-header";
import { pagesConfig } from "@/config/pages";
import { prisma } from "@/lib/prisma-client";

import { CreatePropertyForm } from "./form";

export const metadata: Metadata = {
  title: pagesConfig.propertyCreate.metadata.title,
};

export default async function CreateProperty() {
  const clients = await prisma.client.findMany();

  return (
    <div className="container mx-auto max-w-screen-xl flex-grow p-6">
      <PageHeader config={pagesConfig.propertyCreate} />
      <CreatePropertyForm clients={clients} />
    </div>
  );
}
