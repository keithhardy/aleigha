import { Metadata } from "next";

import { PageHeader } from "@/components/page-header";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: siteConfig.logs.metadata.title,
};

export default async function Logs() {
  return (
    <div className="container mx-auto max-w-screen-xl flex-grow p-6">
      <PageHeader siteConfig={siteConfig.logs} />
    </div>
  );
}
