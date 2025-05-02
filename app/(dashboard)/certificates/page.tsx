import { Metadata } from "next";

import { PageHeader } from "@/components/page-header";
import { pagesConfig } from "@/config/pages";

import { columns } from "./components/data-table/columns";
import { DataTable } from "./components/data-table/data-table";
import { getCertificates } from "./components/data-table/get-certificates";
import { Toolbar } from "./components/data-table/toolbar";

export const metadata: Metadata = {
  title: pagesConfig.certificates.metadata.title,
};

export default async function Certificates() {
  const data = await getCertificates({ take: 10, skip: 0 });

  return (
    <div className="container mx-auto max-w-screen-xl flex-grow p-6">
      <PageHeader config={pagesConfig.certificates} />
      <DataTable columns={columns} data={data} fetchData={getCertificates} toolbar={Toolbar} />
    </div>
  );
}
