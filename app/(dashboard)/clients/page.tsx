import { Metadata } from "next";

import { DataTable } from "@/components/data-table/data-table";
import { PageHeader } from "@/components/page-header";
import { pagesConfig } from "@/config/pages";

import { columns } from "./components/data-table/columns";
import { getClients } from "./components/data-table/get-clients";
import { Toolbar } from "./components/data-table/toolbar";

export const metadata: Metadata = {
  title: pagesConfig.clients.metadata.title,
};

export default async function Clients() {
  const data = await getClients({ take: 10, skip: 0 });

  return (
    <div className="container mx-auto p-6">
      <PageHeader config={pagesConfig.clients} />
      <DataTable columns={columns} data={data} fetchData={getClients} toolbar={Toolbar} />
    </div>
  );
}
