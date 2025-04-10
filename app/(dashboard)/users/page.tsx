import { MoveLeft, SquareArrowOutUpRight } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

import {
  Header,
  HeaderActions,
  HeaderDescription,
  HeaderGroup,
  Heading,
} from "@/components/page-header";
import { Button } from "@/components/ui/button";

import { columns } from "./components/data-table/columns";
import { DataTable } from "./components/data-table/data-table";
import { getPaginatedUsers } from "./components/data-table/get-paginated-users";

export const metadata: Metadata = {
  title: "Reiyen – Users",
};

export default async function Users() {
  const initialData = await getPaginatedUsers({ page: 1, pageSize: 10 });

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
          <Heading>User Management</Heading>
          <HeaderDescription>
            Create, view and manage user accounts.
          </HeaderDescription>
          <HeaderActions>
            <Button asChild size="sm" variant="secondary">
              <Link href="/documentation">
                Docs
                <SquareArrowOutUpRight />
              </Link>
            </Button>
          </HeaderActions>
        </HeaderGroup>
      </Header>
      <DataTable columns={columns} initialData={initialData} />
    </div>
  );
}
