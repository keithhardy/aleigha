import { userService } from "@/src/factories/user-service-factory";

export const revalidate = 3600;

export async function generateStaticParams() {
  const users = await userService.getUsers();
  return users.map((user) => ({
    id: String(user.id),
  }));
}

export default async function User({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await userService.getUser(id);
  return <pre>{JSON.stringify(user, null, 2)}</pre>;
}
