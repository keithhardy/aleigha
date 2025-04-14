"use server";

import { z } from "zod";

import { prisma } from "@/lib/prisma-client";
import { ServerActionResponse } from "@/lib/types/server-action-response";

import { UpdatePhoneSchema } from "./schema";

export async function updatePhone(
  settings: z.infer<typeof UpdatePhoneSchema>,
): Promise<ServerActionResponse<void>> {
  try {
    await prisma.settings.upsert({
      where: {
        id: settings.id || "undefined",
      },
      update: {
        phone: settings.phone,
      },
      create: {
        phone: settings.phone,
      },
    });

    return {
      status: "success",
      heading: "Update Successful",
      message: "Phone number updated successfully.",
    };
  } catch {
    return {
      status: "error",
      heading: "Update Failed",
      message: "Couldn’t update phone number. Please try again.",
    };
  }
}
