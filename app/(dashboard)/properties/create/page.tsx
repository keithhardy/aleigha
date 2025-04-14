import { Metadata } from "next";

import { CreatePropertyForm } from "@/app/(dashboard)/properties/create/form";
import { PageHeader } from "@/components/page-header";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: siteConfig.propertyCreate.metadata.title,
};

export default async function CreateProperty() {
  const clients = await prisma.client.findMany();

  return (
    <div className="container mx-auto max-w-screen-xl flex-grow p-6">
      <PageHeader config={siteConfig.propertyCreate} />
      <CreatePropertyForm clients={clients} />
    </div>
  );
}
