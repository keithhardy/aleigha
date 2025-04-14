import { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageHeader } from "@/components/page-header";
import { config } from "@/lib/config";
import { prisma } from "@/lib/prisma";

import { DeleteUserForm } from "./form";

export const metadata: Metadata = {
  title: config.userDelete.metadata.title,
};

export default async function DeleteUser({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await prisma.user.findFirst({
    where: {
      id: decodeURIComponent((await params).id),
    },
  });

  if (!user) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-screen-xl flex-grow p-6">
      <PageHeader config={config.userDelete} />
      <DeleteUserForm user={user} />
    </div>
  );
}
