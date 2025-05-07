"use server";

import { put } from "@vercel/blob";
import { z } from "zod";

import { ServerActionResponse } from "@/next.types";
import { prisma } from "@/src/lib/db/prisma-client";

import { UpdateLogoSchema } from "./schema";

export async function updateLogo(
  settings: z.infer<typeof UpdateLogoSchema>,
): Promise<ServerActionResponse<void>> {
  let pictureUrl = "";

  try {
    if (settings.picture) {
      const blob = await put(settings.picture.name, settings.picture, {
        access: "public",
      });

      pictureUrl = blob.url;
    }
  } catch {
    return {
      status: "error",
      heading: "Update Failed",
      message: "Couldn’t update logo. Please try again.",
    };
  }

  try {
    await prisma.settings.upsert({
      where: {
        id: settings.id || undefined,
      },
      update: {
        picture: pictureUrl,
      },
      create: {
        picture: pictureUrl,
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
