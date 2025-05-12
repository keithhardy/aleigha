import { Metadata } from "next";

import { PageHeader } from "@/components/page-header";
import { pagesConfig } from "@/config/pages";

export const metadata: Metadata = {
  title: pagesConfig.documentation.metadata.title,
};

export default function Documentation() {
  return (
    <div className="container mx-auto p-6">
      <PageHeader config={pagesConfig.documentation} />
    </div>
  );
}
