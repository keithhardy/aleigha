"use server";

import { Address, Settings } from "@prisma/client";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { ServerActionResponse } from "@/lib/types";
import { updateFile } from "@/lib/vercel-blob";

import { Schema } from "./schema";

export async function updateSettings(
  settings: z.infer<typeof Schema>,
): Promise<ServerActionResponse<Settings & { address: Address | null }>> {
  const settingsResponse = await prisma.settings.findFirst();

  try {
    settings.picture = await updateFile(
      settings.picture,
      settingsResponse?.picture ?? undefined,
      "logo",
    );
  } catch {
    throw new Error("Settings update failed");
  }

  try {
    await prisma.settings.upsert({
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

    return {
      status: "success",
      heading: "Settings Updated Successfully",
      message: "The settings have been updated.",
    };
  } catch {
    return {
      status: "error",
      heading: "Settings Update Failed",
      message: "There was an issue updating the settings. Please try again.",
    };
  }
}
