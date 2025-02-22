"use server";

import { User } from "@prisma/client";
import { z } from "zod";

import { auth0Management } from "@/lib/auth0-management";
import { prisma } from "@/lib/prisma";
import { ServerActionResponse } from "@/lib/types";

import { Schema } from "./schema";

export async function updateUserAction(
  user: z.infer<typeof Schema>
): Promise<ServerActionResponse<User>> {
  try {
    const auth0User = await auth0Management.users.update(
      {
        id: user.auth0Id,
      },
      {
        name: user.name,
        email: user.email,
      }
    );

    const prismaUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        email: user.email,
        phone: user.phone,
        signature: user.signature,
        role: user.role,
      },
    });

    return {
      status: "success",
      heading: "User Update Successfully",
      message: "The user has been updated.",
    };
  } catch (error) {
    return {
      status: "error",
      heading: "User Update Failed",
      message: "There was an issue updating the user. Please try again.",
    };
  }
}
