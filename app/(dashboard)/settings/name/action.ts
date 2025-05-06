"use server";

import { z } from "zod";

import { ServerActionResponse } from "@/next.types";
import { prisma } from "@/prisma/prisma";

import { UpdateNameSchema } from "./schema";

export async function updateName(
  settings: z.infer<typeof UpdateNameSchema>,
): Promise<ServerActionResponse<void>> {
  try {
    await prisma.settings.upsert({
      where: {
        id: settings.id || "undefined",
      },
      update: {
        name: settings.name,
      },
      create: {
        name: settings.name,
      },
    });

    return {
      status: "success",
      heading: "Update Successful",
      message: "The name was updated successfully.",
    };
  } catch {
    return {
      status: "error",
      heading: "Update Failed",
      message: "Couldn’t update the name. Please try again.",
    };
  }
}
