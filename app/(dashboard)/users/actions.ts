"use server";

import { prisma } from "@/lib/db/prisma-client";

export async function checkEmailExists(email: string): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  return !!user;
}
