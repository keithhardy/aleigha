"use server";

import { User } from "@prisma/client";
import { z } from "zod";

import { ServerActionResponse } from "@/next.types";
import { prisma } from "@/prisma";

import { CreateUserSchema } from "./schema";

export async function createUserAction(
  user: z.infer<typeof CreateUserSchema>,
): Promise<ServerActionResponse<User>> {
  try {
    const formattedClients = user.clients.map((client) => ({
      id: client.clientId,
    }));

    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        auth0Id: "auth0User.data.user_id",
        clients: {
          connect: formattedClients,
        },
      },
    });

    return {
      status: "success",
      heading: "User Created Successfully",
      message: "The new user has been created.",
    };
  } catch {
    return {
      status: "error",
      heading: "User Creation Failed",
      message: "There was an issue creating the user. Please try again.",
    };
  }
}
