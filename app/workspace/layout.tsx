import Link from "next/link";
import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/auth";

export default async function WorkspaceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();

  if (!user) redirect('/auth/login')
  
  return (
    <div className="grid grid-cols-6 gap-4 p-4">
      <aside className="col-span-1">
        <nav className="flex flex-col space-y-2">
          <section className="flex flex-col space-y-2">
            <h2 className="text-lg font-semibold">Workspace</h2>
            <Link className="nav-link" href="/workspace">Workspace</Link>
            <Link className="nav-link" href="/workspace/users">Users</Link>
            <Link className="nav-link" href="/workspace/logs">Logs</Link>
            </section>

          <section className="flex flex-col space-y-2">
            <h2 className="text-lg font-semibold">{user.name.toTitleCase()}</h2>
            <Link className="nav-link" href={`/workspace/users/${user.id}`}>Account</Link>
            <a className="nav-link" href="/auth/logout">Logout</a>
          </section>
        </nav>
      </aside>

      <main className="col-span-5 flex flex-col space-y-4">
        {children}
      </main>
    </div>
  );
}
