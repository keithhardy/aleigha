import { Metadata } from "next";

import { PageHeader } from "@/components/page-header";
import { pagesConfig } from "@/config/pages";

export const metadata: Metadata = {
  title: pagesConfig.cookiePolicy.metadata.title,
};

export default async function CookiePolicy() {
  return (
    <div className="container mx-auto p-6">
      <PageHeader config={pagesConfig.cookiePolicy} />
    </div>
  );
}
