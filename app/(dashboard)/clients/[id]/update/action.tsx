"use server";

import { Client } from "@prisma/client";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { ServerActionResponse } from "@/lib/types";
import { updateFile } from "@/lib/vercel-blob";

import { UpdateClientSchema } from "./schema";

export async function updateClient(client: z.infer<typeof UpdateClientSchema>): Promise<ServerActionResponse<Client>> {
  const clientResponse = await prisma.client.findUnique({
    where: {
      id: client.id,
    },
  });

  if (client.picture) {
    try {
      client.picture = await updateFile(client.picture, clientResponse?.picture || undefined, "client-picture");
    } catch {
      return {
        status: "error",
        heading: "Client Update Failed",
        message: "There was an issue updating the client. Please try again.",
      };
    }
  }

  try {
    await prisma.client.update({
      where: {
        id: client.id,
      },
      data: {
        name: client.name,
        phone: client.phone,
        email: client.email,
        picture: client.picture,
        appointedPerson: client.appointedPerson,
        address: {
          update: {
            id: client.address?.id,
            streetAddress: client.address?.streetAddress,
            city: client.address?.city,
            county: client.address?.county,
            postTown: client.address?.postTown,
            postCode: client.address?.postCode,
            country: client.address?.country,
          },
        },
      },
    });

    return {
      status: "success",
      heading: "Client Updated Successfully",
      message: "The clint has been updated.",
    };
  } catch {
    return {
      status: "error",
      heading: "Client Update Failed",
      message: "There was an issue updating the client. Please try again.",
    };
  }
}
