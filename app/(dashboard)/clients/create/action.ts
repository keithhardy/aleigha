"use server";

import { Client } from "@prisma/client";
import { z } from "zod";

import { CreateClientSchema } from "@/app/(dashboard)/clients/create/schema";
import { prisma } from "@/lib/prisma-client";
import { ServerActionResponse } from "@/lib/types/server-action-response";
import { uploadFile } from "@/lib/vercel-blob";

export async function createClient(
  client: z.infer<typeof CreateClientSchema>,
): Promise<ServerActionResponse<Client>> {
  if (client.picture) {
    try {
      client.picture =
        (await uploadFile(client.picture, "client-picture")) || "";
    } catch {
      return {
        status: "error",
        heading: "Client Creation Failed",
        message: "There was an issue creating the client. Please try again.",
      };
    }
  }

  try {
    await prisma.client.create({
      data: {
        name: client.name,
        phone: client.phone,
        email: client.email,
        picture: client.picture,
        appointedPerson: client.appointedPerson,
        address: {
          create: {
            streetAddress: client.address.streetAddress,
            city: client.address.city,
            county: client.address.county,
            postTown: client.address.postTown,
            postCode: client.address.postCode,
            country: client.address.country,
          },
        },
      },
    });

    return {
      status: "success",
      heading: "Client Created Successfully",
      message: "The new client has been created.",
    };
  } catch {
    return {
      status: "error",
      heading: "Client Creation Failed",
      message: "There was an issue creating the client. Please try again.",
    };
  }
}
