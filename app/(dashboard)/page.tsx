import { Metadata } from "next";

import { PageHeader } from "@/components/ui/page-header";
import { pagesConfig } from "@/config/pages";

export const metadata: Metadata = {
  title: pagesConfig.dashboard.metadata.title,
};

export default async function Dashboard() {
  return (
    <div className="container mx-auto p-6">
      <PageHeader config={pagesConfig.dashboard} />
    </div>
  );
}
