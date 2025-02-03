import Link from "next/link";

import { prisma } from "@/lib/prisma";

export default async function Users() {
  const users = await prisma.user.findMany()

  return (
    <div className="space-y-2">
      {users.map((user) => (
        <div key={user.id} className="flex space-x-2 items-baseline">
          <p className="font-semibold">{user.name.toTitleCase()}</p>
          <Link href={`/users/${user.id}`}>View</Link>
          <Link href={`/users/${user.id}/delete`}>Delete</Link>
        </div>
      ))}
    </div>
  );
};
