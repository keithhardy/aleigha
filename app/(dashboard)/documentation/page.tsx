import { Metadata } from "next";

import { PageHeader } from "@/components/page-header";
import { config } from "@/lib/config";

export const metadata: Metadata = {
  title: config.documentation.metadata.title,
};

export default function Documentation() {
  return (
    <div className="container mx-auto max-w-screen-xl flex-grow p-6">
      <PageHeader config={config.documentation} />
    </div>
  );
}
