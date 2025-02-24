import {
  Header,
  HeaderDescription,
  HeaderGroup,
  Heading,
} from "@/components/page-header";
import { prisma } from "@/lib/prisma";

import { columns } from "./components/data-table/columns";
import { DataTable } from "./components/data-table/data-table";

export default async function Users() {
  const users = await prisma.user.findMany();

  return (
    <>
      <Header>
        <HeaderGroup>
          <Heading>View Users</Heading>
          <HeaderDescription>
            Manage your users. View a table of users and access links to create,
            update, or delete user records.
          </HeaderDescription>
        </HeaderGroup>
      </Header>

      <DataTable columns={columns} data={users} />
    </>
  );
}
