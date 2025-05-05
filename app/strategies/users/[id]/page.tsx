import { getUser, getUsers } from "@/lib/services/user";

export const revalidate = 3600;

export async function generateStaticParams() {
  const users = await getUsers();
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
  const users = await getUser(id);
  return <pre>{JSON.stringify(users, null, 2)}</pre>;
}
