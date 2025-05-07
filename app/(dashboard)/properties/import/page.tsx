import { Metadata } from "next";

import { PageHeader } from "@/components/page-header";
import { pagesConfig } from "@/config/pages";
import { prisma } from "@/src/lib/db/prisma-client";

import { ImportPropertiesForm } from "./form";

export const metadata: Metadata = {
  title: pagesConfig.propertyImport.metadata.title,
};

export default async function ImportProperties() {
  const clients = await prisma.client.findMany();

  return (
    <div className="container mx-auto max-w-screen-xl flex-grow p-6">
      <PageHeader config={pagesConfig.propertyImport} />
      <ImportPropertiesForm clients={clients} />
    </div>
  );
}
