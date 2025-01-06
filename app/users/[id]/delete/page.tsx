import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";

import DeleteUserForm from "./form";

export default async function DeleteUser({
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
  
  return <DeleteUserForm />;
}
