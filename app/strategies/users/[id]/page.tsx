import { getUser } from "@/lib/services/user";

export default async function User({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const users = await getUser(id);
  return <pre>{JSON.stringify(users, null, 2)}</pre>;
}
