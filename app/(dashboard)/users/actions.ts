"use server"

import { prisma } from "@/lib/prisma";

export async function checkEmailExists(
  email: string
): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { email }
  });

  return !!user;
}
