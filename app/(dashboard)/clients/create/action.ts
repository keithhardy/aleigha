"use server";

import { revalidatePath } from "next/cache";

import { Schema } from "@/app/(dashboard)/clients/create/schema";
import { prisma } from "@/lib/prisma";
import { uploadFile } from "@/lib/vercel-blob";
import { Client } from "@prisma/client";
import { z } from "zod";

export async function createClient(
  client: z.infer<typeof Schema>
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
