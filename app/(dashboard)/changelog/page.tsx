import { Metadata } from "next";

import { PageHeader } from "@/components/page-header";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: siteConfig.changelog.metadata.title,
};

export default function Changelog() {
  return (
    <div className="container mx-auto max-w-screen-xl flex-grow p-6">
      <PageHeader siteConfig={siteConfig.changelog} />
    </div>
  );
}
