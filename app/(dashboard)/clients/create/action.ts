"use server";

import { Client } from "@prisma/client";
import { z } from "zod";

import { Schema } from "@/app/(dashboard)/clients/create/schema";
import { prisma } from "@/lib/prisma";
import { ServerActionResponse } from "@/lib/types";
import { uploadFile } from "@/lib/vercel-blob";

export async function createClient(
  client: z.infer<typeof Schema>,
): Promise<ServerActionResponse<Client>> {
  try {
    try {
      client.picture = await uploadFile(client.picture, "client-logo");
    } catch {
      return {
        status: "error",
        heading: "Client Creation Failed",
        message: "There was an issue creating the client. Please try again.",
      };
    }

    await prisma.client.create({
      data: {
        name: client.name,
        phone: client.phone || "",
        email: client.email || "",
        picture: client.picture || "",
        appointedPerson: client.appointedPerson || "",
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
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      heading: "Client Creation Failed",
      message: "There was an issue creating the client. Please try again.",
    };
  }
}
