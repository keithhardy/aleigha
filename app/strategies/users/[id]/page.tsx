import { getUser, getUsers } from "@/prisma";

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
  const user = await getUser(id);
  return <pre>{JSON.stringify(user, null, 2)}</pre>;
}
