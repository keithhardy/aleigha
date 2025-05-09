import { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageHeader } from "@/components/ui/page-header";
import { pagesConfig } from "@/config/pages";
import { prisma } from "@/prisma";

import { DeleteUserForm } from "./form";

export const metadata: Metadata = {
  title: pagesConfig.userDelete.metadata.title,
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
    <div className="container mx-auto p-6">
      <PageHeader config={pagesConfig.userDelete} />
      <DeleteUserForm user={user} />
    </div>
  );
}
