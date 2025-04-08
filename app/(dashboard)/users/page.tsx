import { MoveLeft } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

import { Header, HeaderGroup, Heading } from "@/components/page-header";

import { columns } from "./components/data-table/columns";
import { DataTable } from "./components/data-table/data-table";

export const metadata: Metadata = {
  title: "Reiyen – Users",
};

export default async function Users() {
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
          <Heading>Users</Heading>
        </HeaderGroup>
      </Header>
      <DataTable columns={columns} />
    </div>
  );
}
