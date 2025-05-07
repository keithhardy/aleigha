"use server";

import { z } from "zod";

import { ServerActionResponse } from "@/next.types";
import { prisma } from "@/prisma";

import { UpdateAddressSchema } from "./schema";

export async function updateAddress(
  settings: z.infer<typeof UpdateAddressSchema>,
): Promise<ServerActionResponse<void>> {
  try {
    await prisma.settings.upsert({
      where: {
        id: settings.id || "undefined",
      },
      update: {
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
    });

    return {
      status: "success",
      heading: "Update Successful",
      message: "Address updated successfully.",
    };
  } catch {
    return {
      status: "error",
      heading: "Update Failed",
      message: "Couldn’t update address. Please try again.",
    };
  }
}
