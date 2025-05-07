"use server";

import { User } from "@prisma/client";
import { z } from "zod";

import { ServerActionResponse } from "@/next.types";
import { prisma } from "@/src/lib/db/prisma-client";

import { UpdateUserSchema } from "./schema";

export async function updateUser(
  user: z.infer<typeof UpdateUserSchema>,
): Promise<ServerActionResponse<User>> {
  const formattedClientsToConnect = user.clientsToConnect.map((client) => ({
    id: client.clientId,
  }));

  const formattedClientsToDisconnect = user.clientsToDisconnect.map(
    (client) => ({
      id: client.clientId,
    }),
  );

  try {
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        signature: user.signature,
        role: user.role,
        clients: {
          connect: formattedClientsToConnect,
          disconnect: formattedClientsToDisconnect,
        },
      },
    });

    return {
      status: "success",
      heading: "User Updated Successfully",
      message: "The user has been updated.",
    };
  } catch {
    return {
      status: "error",
      heading: "User Update Failed",
      message: "There was an issue updating the user. Please try again.",
    };
  }
}
