"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { auth0Management } from "@/lib/auth0-management";
import { prisma } from "@/lib/prisma";

import { Schema } from "./schema";

export async function deleteUser(user: z.infer<typeof Schema>): Promise<void> {
  try {
    await auth0Management.users.delete({
      id: user.auth0Id,
    });

    await prisma.user.delete({
      where: {
        id: user.id,
      },
    });

    revalidatePath("/users");
  } catch {
    throw new Error("Failed to delete user.");
  }
}
