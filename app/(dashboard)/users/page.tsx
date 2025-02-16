import { prisma } from "@/lib/prisma";
import { DataTable } from "./components/data-table/data-table";
import { columns } from "./components/data-table/columns";

export default async function Users() {
  const users = await prisma.user.findMany()

  return (
    <DataTable columns={columns} data={users} />
  );
};
