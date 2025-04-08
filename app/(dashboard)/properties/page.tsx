import { MoveLeft } from "lucide-react";
import Link from "next/link";

import { columns } from "@/app/(dashboard)/properties/components/data-table/columns";
import { DataTable } from "@/app/(dashboard)/properties/components/data-table/data-table";
import { Header, HeaderGroup, Heading } from "@/components/page-header";
import { prisma } from "@/lib/prisma";

export default async function Properties() {
  const properties = await prisma.property.findMany({
    include: {
      address: true,
      client: true,
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
          <Heading>Properties</Heading>
        </HeaderGroup>
      </Header>

      <DataTable columns={columns} data={properties} />
    </div>
  );
}
