"use server";

import { z } from "zod";

import { prisma } from "@/lib/prisma-client";
import { ServerActionResponse } from "@/types/server-action-response";
import { updateFile } from "@/lib/vercel-blob";

import { UpdateLogoSchema } from "./schema";

export async function updateLogo(
  settings: z.infer<typeof UpdateLogoSchema>,
): Promise<ServerActionResponse<void>> {
  const settingsResponse = await prisma.settings.findFirst();

  if (settings.picture) {
    try {
      settings.picture = await updateFile(
        settings.picture,
        settingsResponse?.picture ?? undefined,
        "contractor-picture",
      );
    } catch {
      return {
        status: "error",
        heading: "Settings Update Failed",
        message: "There was an issue updating the settings. Please try again.",
      };
    }
  }

  try {
    await prisma.settings.upsert({
      where: {
        id: settings.id || "undefined",
      },
      update: {
        picture: settings.picture,
      },
      create: {
        picture: settings.picture,
      },
    });

    return {
      status: "success",
      heading: "Update Successful",
      message: "Logo updated successfully.",
    };
  } catch {
    return {
      status: "error",
      heading: "Update Failed",
      message: "Couldn’t update logo. Please try again.",
    };
  }
}
