import { Metadata } from "next";

import { CreateClientForm } from "@/app/(dashboard)/clients/create/form";
import { PageHeader } from "@/components/page-header";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: siteConfig.clientCreate.metadata.title,
};

export default function CreateClient() {
  return (
    <div className="container mx-auto max-w-screen-xl flex-grow p-6">
      <PageHeader config={siteConfig.clientCreate} />
      <CreateClientForm />
    </div>
  );
}
