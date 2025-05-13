import { userService } from "@/di/factories/user-service-factory";

import { columns } from "./components/table/columns";
import { Table } from "./components/table/table";

export const revalidate = 3600;

export default async function Users() {
  const users = await userService.getUsers();
  return <Table data={users} columns={columns} />;
}
