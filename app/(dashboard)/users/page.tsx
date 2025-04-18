import { Metadata } from "next";

import { PageHeader } from "@/components/page-header";
import { pagesConfig } from "@/config/pages";

import { DataTable } from "./components/data-table/_data-table";
import { columns } from "./components/data-table/columns";
import { getUsers } from "./components/data-table/get-users";

export const metadata: Metadata = {
  title: pagesConfig.users.metadata.title,
};

export default async function Users() {
  const fetchedData = await getUsers();

  return (
    <div className="container mx-auto max-w-screen-xl flex-grow p-6">
      <PageHeader config={pagesConfig.users} />
      <DataTable columns={columns} data={fetchedData} />
    </div>
  );
}
