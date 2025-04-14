"use server";

import { z } from "zod";

import { auth0Management } from "@/lib/auth0-management-client";
import { prisma } from "@/lib/prisma-client";
import { ServerActionResponse } from "@/lib/types/server-action-response";

import { DeleteUserSchema } from "./schema";

export async function deleteUser(
  user: z.infer<typeof DeleteUserSchema>,
): Promise<ServerActionResponse<void>> {
  try {
    await auth0Management.users.delete({
      id: user.auth0Id,
    });

    await prisma.user.delete({
      where: {
        id: user.id,
      },
    });

    return {
      status: "success",
      heading: "User Deleted Successfully",
      message: "The user has been deleted.",
    };
  } catch {
    return {
      status: "error",
      heading: "User Delete Failed",
      message: "There was an issue deleting the user. Please try again.",
    };
  }
}
