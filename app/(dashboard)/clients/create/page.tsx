import { Metadata } from "next";

import { CreateClientForm } from "@/app/(dashboard)/clients/create/form";
import { PageHeader } from "@/components/ui/page-header";
import { pagesConfig } from "@/config/pages";

export const metadata: Metadata = {
  title: pagesConfig.clientCreate.metadata.title,
};

export default function CreateClient() {
  return (
    <div className="container mx-auto p-6">
      <PageHeader config={pagesConfig.clientCreate} />
      <CreateClientForm />
    </div>
  );
}
