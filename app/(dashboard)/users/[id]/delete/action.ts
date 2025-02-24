"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { auth0Management } from "@/lib/auth0-management";
import { prisma } from "@/lib/prisma";

import { Schema } from "./schema";
import { ServerActionResponse } from "@/lib/types";

export async function deleteUser(
  user: z.infer<typeof Schema>
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
  } catch (error) {
    return {
      status: "error",
      heading: "User Delete Failed",
      message: "There was an issue deleting the user. Please try again.",
    };
  }
}
