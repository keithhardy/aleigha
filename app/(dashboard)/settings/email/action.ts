"use server";

import { z } from "zod";

import { ServerActionResponse } from "@/next.types";
import { prisma } from "@/prisma";

import { UpdateEmailSchema } from "./schema";

export async function updateEmail(
  settings: z.infer<typeof UpdateEmailSchema>,
): Promise<ServerActionResponse<void>> {
  try {
    await prisma.settings.upsert({
      where: {
        id: settings.id || "undefined",
      },
      update: {
        email: settings.email,
      },
      create: {
        email: settings.email,
      },
    });

    return {
      status: "success",
      heading: "Update Successful",
      message: "Email updated successfully.",
    };
  } catch {
    return {
      status: "error",
      heading: "Update Failed",
      message: "Couldn’t update email. Please try again.",
    };
  }
}
