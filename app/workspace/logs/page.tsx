import Link from "next/link";

import { prisma } from "@/lib/prisma";

export default async function Users() {
  const log = await prisma.log.findMany()

  return (
    <div className="space-y-2">
      <h1 className="text-lg font-semibold">Logs</h1>

      <div className="flex flex-col space-y-2">
        <Link href="/workspace">Back to Workspace</Link>
      </div>

      <div className="space-y-2">
        {log.map((user) => (
          <div key={user.id} className="flex flex-col space-y-2">
            <p>{user.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
