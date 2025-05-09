import { Metadata } from "next";

import { PageHeader } from "@/components/ui/page-header";
import { pagesConfig } from "@/config/pages";

export const metadata: Metadata = {
  title: pagesConfig.changelog.metadata.title,
};

export default function Changelog() {
  return (
    <div className="container mx-auto p-6">
      <PageHeader config={pagesConfig.changelog} />
    </div>
  );
}
