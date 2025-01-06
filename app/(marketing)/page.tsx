import Link from "next/link";

import { getCurrentUser } from "@/lib/auth";

export default async function Marketing() {
  const user = await getCurrentUser();

  return (
    <div className="flex items-center justify-center min-h-screen">
      {user ? (
        <div>
          <p className="text-lg">
            Welcome back, {user.name}!
          </p>
          <Link href="/workspace">
            Go to Workspace
          </Link>
        </div>
      ) : (
        <a href="/auth/login">
          Login
        </a>
      )}
    </div>
  );
}
