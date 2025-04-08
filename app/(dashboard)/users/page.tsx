import { MoveLeft } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

import { Header, HeaderGroup, Heading } from "@/components/page-header";
import { prisma } from "@/lib/prisma";

import { columns } from "./components/data-table/columns";
import { DataTable } from "./components/data-table/data-table";

export const metadata: Metadata = {
  title: "Reiyen – Users",
};

interface UsersPageProps {
  searchParams: Promise<{ page?: string; pageSize?: string }>;
}

export default async function Users({ searchParams }: UsersPageProps) {
  const resolvedParams = await searchParams;

  const page = Number(resolvedParams.page) || 1;
  const pageSize = Number(resolvedParams.pageSize) || 10;

  const [users, totalCount] = await Promise.all([
    prisma.user.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.user.count(),
  ]);

  const pageCount = Math.ceil(totalCount / pageSize);

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
      <DataTable
        columns={columns}
        data={users}
        pageCount={pageCount}
        pagination={{ pageIndex: page - 1, pageSize }}
      />
    </div>
  );
}
