import { User } from "@prisma/client";
import Link from "next/link";

export default function UpdateUserForm({
  user
}: {
  user: User
}) { 
  return (
    <div className='space-y-2'>
      <h1 className="text-lg font-semibold">Update User</h1>

      <div className="flex flex-col space-y-2">
        <Link href={`/workspace/users/${user.id}`}>Back to {user.name.toTitleCase()}</Link>
      </div>
    </div>
  );
}