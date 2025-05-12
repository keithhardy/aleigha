import { Metadata } from "next";

import { PageHeader } from "@/components/page-header";
import { pagesConfig } from "@/config/pages";

export const metadata: Metadata = {
  title: pagesConfig.logs.metadata.title,
};

export default async function Logs() {
  return (
    <div className="container mx-auto p-6">
      <PageHeader config={pagesConfig.logs} />
    </div>
  );
}
