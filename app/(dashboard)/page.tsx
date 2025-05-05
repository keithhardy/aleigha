import { Metadata } from "next";

import { PageHeader } from "@/components/page-header";
import { pagesConfig } from "@/config/pages";
import { auth0 } from "@/lib/auth/auth0-client";

export const metadata: Metadata = {
  title: pagesConfig.dashboard.metadata.title,
};

export default async function Dashboard() {
  const token = await auth0.getAccessToken();

  const res = await fetch(`http://localhost:3000/api/users`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token.token}`,
    },
  });

  const users = await res.json();

  return (
    <div className="container mx-auto max-w-screen-xl flex-grow p-6">
      <PageHeader config={pagesConfig.dashboard} />
      <pre>{JSON.stringify(users, null, 2)}</pre>
      {/* <pre>{JSON.stringify(token, null, 2)}</pre> */}
    </div>
  );
}
