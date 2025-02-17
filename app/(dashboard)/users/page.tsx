import { prisma } from "@/lib/prisma";

import { columns } from "./components/data-table/columns";
import { DataTable } from "./components/data-table/data-table";

export default async function Users() {
  const users = await prisma.user.findMany()

  return (
    <DataTable columns={columns} data={users} />
  );
};
