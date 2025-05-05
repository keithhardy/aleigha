import { auth0 } from "@/auth0";
import { prisma } from "@/prisma";

export async function getCurrentUser() {
  try {
    const session = await auth0.getSession();

    if (!session?.user) {
      throw new Error("No active session found");
    }

    const currentUser = await prisma.user.findUnique({
      where: { id: session.user.sub },
    });

    if (!currentUser) {
      throw new Error("User not found in database");
    }

    return currentUser;
  } catch {
    throw new Error("Failed to get current user");
  }
}
