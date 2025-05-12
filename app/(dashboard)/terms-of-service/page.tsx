import { Metadata } from "next";

import { PageHeader } from "@/components/page-header";
import { pagesConfig } from "@/config/pages";

export const metadata: Metadata = {
  title: pagesConfig.termsOfService.metadata.title,
};

export default async function TermsOfService() {
  return (
    <div className="container mx-auto p-6">
      <PageHeader config={pagesConfig.termsOfService} />
    </div>
  );
}
