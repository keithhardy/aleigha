"use server";

import { User } from "@prisma/client";
import { z } from "zod";

import { auth0Management } from "@/lib/auth0-management";
import { prisma } from "@/lib/prisma";
import { ServerActionResponse } from "@/lib/types";

import { Schema } from "./schema";

export async function createUserAction(
  data: z.infer<typeof Schema>
): Promise<ServerActionResponse<User>> {
  try {
    const formattedClients = data.clients.map((client) => ({
      id: client.clientId,
    }));

    const auth0User = await auth0Management.users.create({
      connection: "Username-Password-Authentication",
      name: data.name,
      email: data.email,
      password: data.password,
    });

    const prismaUser = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        role: data.role,
        auth0Id: auth0User.data.user_id,
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
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      heading: "User Creation Failed",
      message: "There was an issue creating the user. Please try again.",
    };
  }
}
