"use server";

import { Settings } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
// import { updateFile } from "@/lib/vercel-blob";

import { Schema } from "./schema";

export async function updateSettings(
  settings: z.infer<typeof Schema>
): Promise<Settings> {
  try {
    const updatedSettings = await prisma.settings.update({
      where: {
        id: settings.id,
      },
      data: {
        name: settings.name,
        email: settings.email,
        phone: settings.phone,
        picture: settings.picture,
        governingBody: settings.governingBody,
        governingBodyNumber: settings.governingBodyNumber,
        address: {
          update: {
            streetAddress: settings.address?.streetAddress,
            city: settings.address?.city,
            county: settings.address?.county,
            postTown: settings.address?.postTown,
            postCode: settings.address?.postCode,
            country: settings.address?.country,
          },
        },
      },
    });

    revalidatePath("/settings");
    return updatedSettings;
  } catch (error) {
    console.log(error);
    throw new Error("Settings update failed");
  }
}
