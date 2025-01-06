import Link from "next/link";

import { prisma } from "@/lib/prisma";

export default async function Users() {
  const users = await prisma.user.findMany()

  return (
    <div className="space-y-2">
      <h1 className="text-lg font-semibold">Users</h1>

      <div className="flex flex-col space-y-2">
        <Link href="/workspace">Back to Workspace</Link>
        <Link href="/workspace/users/create">Create User</Link>
      </div>

      <div className="space-y-2">
        {users.map((user) => (
          <div key={user.id} className="flex space-x-2 items-baseline">
            <p className="font-semibold">{user.name.toTitleCase()}</p>
            <Link href={`/workspace/users/${user.id}`}>View</Link>
            <Link href={`/workspace/users/${user.id}/delete`}>Delete</Link>
          </div>
        ))}
      </div>
    </div>
  );
};
