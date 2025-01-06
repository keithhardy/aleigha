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
    <p>{user.name}</p>
  );
};
