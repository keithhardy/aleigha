import { Metadata } from "next";

import { PageHeader } from "@/components/page-header";
import { siteConfig } from "@/lib/site-config";

import { columns } from "./components/data-table/columns";
import { DataTable } from "./components/data-table/data-table";
import { getPaginatedUsers } from "./components/data-table/get-paginated-users";

export const metadata: Metadata = {
  title: siteConfig.users.metadata.title,
};

export default async function Users() {
  const initialData = await getPaginatedUsers({ page: 1, pageSize: 10 });

  return (
    <div className="container mx-auto max-w-screen-xl flex-grow p-6">
      <PageHeader config={siteConfig.users} />
      <DataTable columns={columns} initialData={initialData} />
    </div>
  );
}
