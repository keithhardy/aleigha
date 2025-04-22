import { Metadata } from "next";

import { columns } from "@/app/(dashboard)/properties/components/data-table/columns";
import { DataTable } from "@/app/(dashboard)/properties/components/data-table/data-table";
import { PageHeader } from "@/components/page-header";
import { pagesConfig } from "@/config/pages";

import { getProperties } from "./components/data-table/get-properties";

export const metadata: Metadata = {
  title: pagesConfig.properties.metadata.title,
};

export default async function Properties() {
  const data = await getProperties({ take: 10, skip: 0 });

  return (
    <div className="container mx-auto max-w-screen-xl flex-grow p-6">
      <PageHeader config={pagesConfig.properties} />
      <DataTable columns={columns} data={data} fetchData={getProperties} />
    </div>
  );
}
