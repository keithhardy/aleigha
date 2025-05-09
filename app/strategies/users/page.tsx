import { userService } from "@/src/factories/user-service-factory";

export const revalidate = 3600;

export default async function Users() {
  const users = await userService.getUsers();
  return JSON.stringify(users);
}
