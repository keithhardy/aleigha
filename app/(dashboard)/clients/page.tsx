import { MoveLeft } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

import { columns } from "@/app/(dashboard)/clients/components/data-table/columns";
import { DataTable } from "@/app/(dashboard)/clients/components/data-table/data-table";
import { Header, HeaderGroup, Heading } from "@/components/page-header";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Reiyen – Clients",
};

export default async function Clients() {
  const clients = await prisma.client.findMany({
    include: {
      address: true,
    },
  });

  return (
    <div className="container mx-auto max-w-screen-xl flex-grow p-6">
      <Header>
        <HeaderGroup>
          <Link
            href={"/"}
            className="inline-flex items-center text-sm font-semibold"
          >
            <MoveLeft size={22} className="mr-2" />
            <span>Back to Dashboard</span>
          </Link>
          <Heading>Clients</Heading>
        </HeaderGroup>
      </Header>
      <DataTable columns={columns} data={clients} />
    </div>
  );
}
