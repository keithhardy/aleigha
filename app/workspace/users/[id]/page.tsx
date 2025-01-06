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
        <Link href="/workspace/users">Back to Users</Link>
      </div>
      
      <div className="space-y-2">
        <div key={user.id} className="flex flex-col space-y-2">
          <p className="text-lg font-semibold">{user.name}</p>
          <div className="flex flex-col space-y-2">
            <p>Email: {user.email}</p>
            <p>Position: {user.position.toTitleCase()}</p>
          </div>
          <div className="flex space-x-4">
            <Link href={`/workspace/users/${user.id}/update`}>Update</Link>
            <Link href={`/workspace/users/${user.id}/delete`}>Delete</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
