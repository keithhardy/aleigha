import { Metadata } from "next";

import { PageHeader } from "@/components/ui/page-header";
import { pagesConfig } from "@/config/pages";

export const metadata: Metadata = {
  title: pagesConfig.help.metadata.title,
};

export default function Help() {
  return (
    <div className="container mx-auto p-6">
      <PageHeader config={pagesConfig.help} />
    </div>
  );
}
