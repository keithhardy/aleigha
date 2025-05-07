"use server";

import { prisma } from "@/prisma";

export async function checkEmailExists(email: string): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  return !!user;
}
