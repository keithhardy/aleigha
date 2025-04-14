import { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageHeader } from "@/components/page-header";
import { prisma } from "@/lib/prisma-client";
import { siteConfig } from "@/lib/site-config";

import { DeleteUserForm } from "./form";

export const metadata: Metadata = {
  title: siteConfig.userDelete.metadata.title,
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
      <PageHeader config={siteConfig.userDelete} />
      <DeleteUserForm user={user} />
    </div>
  );
}
