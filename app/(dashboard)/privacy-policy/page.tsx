import { Metadata } from "next";

import { PageHeader } from "@/components/page-header";
import { pagesConfig } from "@/config/pages";

export const metadata: Metadata = {
  title: pagesConfig.privacyPolicy.metadata.title,
};

export default async function PrivacyPolicy() {
  return (
    <div className="container mx-auto max-w-screen-xl flex-grow p-6">
      <PageHeader config={pagesConfig.privacyPolicy} />
    </div>
  );
}
