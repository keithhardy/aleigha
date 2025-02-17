"use server";

import { Address, Settings } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { updateFile } from "@/lib/vercel-blob";

import { Schema } from "./schema";

export async function updateSettings(
  settings: z.infer<typeof Schema>
): Promise<Settings & { address: Address | null }> {
  const settingsResponse = await prisma.settings.findFirst();

  try {
    settings.picture = await updateFile(
      settings.picture,
      settingsResponse?.picture ?? undefined,
      "logo"
    );
  } catch (error) {
    throw new Error("Settings update failed");
  }

  try {
    const updatedSettings = await prisma.settings.upsert({
      where: {
        id: settings.id,
      },
      update: {
        name: settings.name,
        email: settings.email,
        phone: settings.phone,
        picture: settings.picture,
        governingBody: settings.governingBody,
        governingBodyNumber: settings.governingBodyNumber,
        address: {
          update: {
            streetAddress: settings.address.streetAddress,
            city: settings.address.city,
            county: settings.address.county,
            postTown: settings.address.postTown,
            postCode: settings.address.postCode,
            country: settings.address.country,
          },
        },
      },
      create: {
        name: settings.name,
        email: settings.email,
        phone: settings.phone,
        picture: settings.picture,
        governingBody: settings.governingBody,
        governingBodyNumber: settings.governingBodyNumber,
        address: {
          create: {
            streetAddress: settings.address.streetAddress,
            city: settings.address.city,
            county: settings.address.county,
            postTown: settings.address.postTown,
            postCode: settings.address.postCode,
            country: settings.address.country,
          },
        },
      },
      include: {
        address: true,
      },
    });

    revalidatePath("/settings");
    return updatedSettings;
  } catch (error) {
    throw new Error("Settings update failed");
  }
}
