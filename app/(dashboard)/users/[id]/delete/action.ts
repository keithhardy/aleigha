"use server";

import { z } from "zod";

import { ServerActionResponse } from "@/next.types";
import { prisma } from "@/src/lib/db/prisma-client";

import { DeleteUserSchema } from "./schema";

export async function deleteUser(
  user: z.infer<typeof DeleteUserSchema>,
): Promise<ServerActionResponse<void>> {
  try {
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
