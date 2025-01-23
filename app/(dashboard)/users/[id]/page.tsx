import Link from "next/link";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";

export default async function User({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const user = await prisma.user.findUnique({
    where: {
      id
    }
  })

  if (!user) {
    notFound();
  }

  return (
    <div className='space-y-2'>
      <h1 className="text-lg font-semibold">User</h1>

      <div className="flex flex-col space-y-2">
        <Link href="/users">Back to Users</Link>
      </div>

      <div className="space-y-2">
        <div key={user.id} className="flex flex-col space-y-2">
          <div className="flex flex-col space-y-2">
            <p>Name</p>
            <p className="font-semibold">{user.name.toTitleCase()}</p>
            <p>Email</p>
            <p className="font-semibold">{user.email}</p>
            <p>Position</p>
            <p className="font-semibold">{user.position.toTitleCase()}</p>
            <p>Picture</p>
            <p className="font-semibold">{user.picture || '-'}</p>
            <p>Phone</p>
            <p className="font-semibold">{user.phone || '-'}</p>
            <p>Signature</p>
            <p className="font-semibold">{user.signature || '-'}</p>
          </div>
          <div>
            <Link href={`/users/${user.id}/delete`}>Delete</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
