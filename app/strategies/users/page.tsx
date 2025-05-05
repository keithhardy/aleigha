import { getUsers } from "@/lib/services/user";

export const revalidate = 3600;

export default async function Users() {
  const users = await getUsers();
  return <pre>{JSON.stringify(users, null, 2)}</pre>;
}
