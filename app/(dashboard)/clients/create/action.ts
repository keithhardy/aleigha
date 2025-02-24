"use server";

import { Client } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { Schema } from "@/app/(dashboard)/clients/create/schema";
import { prisma } from "@/lib/prisma";
import { uploadFile } from "@/lib/vercel-blob";

export async function createClient(
  client: z.infer<typeof Schema>,
): Promise<Client> {
  try {
    try {
      client.picture = await uploadFile(client.picture, "logo");
    } catch {
      throw new Error("Client creation failed");
    }

    const createdClient = await prisma.client.create({
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

    revalidatePath("/clients");
    return createdClient;
  } catch {
    throw new Error("Client creation failed");
  }
}
