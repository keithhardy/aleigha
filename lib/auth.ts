import { User } from "@prisma/client";

import { auth0 } from "@/lib/auth0";
import { prisma } from "@/lib/prisma";

export async function getCurrentUser(): Promise<User | null> {
  const session = await auth0.getSession();

  if (!session || !session.user) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { auth0Id: session.user.sub },
  });

  return user;
}
