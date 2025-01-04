"use server";

import { User } from "@prisma/client";

import { auth0 } from "@/lib/auth0";
import { prisma } from "@/lib/prisma";

export async function getCurrentUser(): Promise<User & { auth0Id: string }> {
  const session = await auth0.getSession();

  if (!session || !session.user?.email) {
    throw new Error("User session not found or email is missing.");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!user) {
    throw new Error("User not found.");
  }

  return { ...user, auth0Id: session.user.sub };
}
