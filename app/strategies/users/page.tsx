import { userService } from "@/src/factories/user-service-factory";

export const revalidate = 3600;

export default async function Users() {
  const users = await userService.getUsers();
  return <pre>{JSON.stringify(users, null, 2)}</pre>;
}
