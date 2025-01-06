import Link from "next/link";

import { prisma } from "@/lib/prisma";

export default async function Users() {
  const users = await prisma.user.findMany()

  return (
    users.map((user) => (
      <p key={user.id}>
        <Link href={`/users/${user.id}`}>{user.name}</Link>
      </p>
    ))
  );
};
