"use server";

import { z } from "zod";

import { ServerActionResponse } from "@/next.types";
import { prisma } from "@/src/lib/db/prisma-client";

import { UpdateGoverningBodySchema } from "./schema";

export async function updateGoverningBody(
  settings: z.infer<typeof UpdateGoverningBodySchema>,
): Promise<ServerActionResponse<void>> {
  try {
    await prisma.settings.upsert({
      where: {
        id: settings.id || "undefined",
      },
      update: {
        governingBody: settings.governingBody,
        governingBodyNumber: settings.governingBodyNumber,
      },
      create: {
        governingBody: settings.governingBody,
        governingBodyNumber: settings.governingBodyNumber,
      },
    });

    return {
      status: "success",
      heading: "Update Successful",
      message: "Governing body updated successfully.",
    };
  } catch {
    return {
      status: "error",
      heading: "Update Failed",
      message: "Couldn’t update governing body. Please try again.",
    };
  }
}
