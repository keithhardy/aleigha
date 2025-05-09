import { Metadata } from "next";

import { CreatePropertyForm } from "@/app/(dashboard)/properties/create/form";
import { PageHeader } from "@/components/ui/page-header";
import { pagesConfig } from "@/config/pages";
import { prisma } from "@/prisma";

export const metadata: Metadata = {
  title: pagesConfig.propertyCreate.metadata.title,
};

export default async function CreateProperty() {
  const clients = await prisma.client.findMany();

  return (
    <div className="container mx-auto p-6">
      <PageHeader config={pagesConfig.propertyCreate} />
      <CreatePropertyForm clients={clients} />
    </div>
  );
}
