import { getUsers } from "@/lib/services/user-services";

export default async function Users() {
  const users = await getUsers();
  return <pre>{JSON.stringify(users, null, 2)}</pre>;
}
