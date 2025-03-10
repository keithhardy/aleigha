"use server";

import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { ServerActionResponse } from "@/lib/types";

import { UpdatePresenceOfAdequateArrangementsSchema } from "./schema";

export async function updatePresenceOfAdequateArrangements(
  electricalInstallationConditionReport: z.infer<
    typeof UpdatePresenceOfAdequateArrangementsSchema
  >,
): Promise<ServerActionResponse<void>> {
  try {
    await prisma.electricalInstallationConditionReport.update({
      where: {
        id: electricalInstallationConditionReport.id,
      },
      data: {
        item_2_1: electricalInstallationConditionReport.item_2_1,
        item_2_2: electricalInstallationConditionReport.item_2_2,
      },
    });

    return {
      status: "success",
      heading: "Update Successful",
      message: "Certificate updated successfully.",
    };
  } catch {
    return {
      status: "error",
      heading: "Update Failed",
      message: "Couldn’t update certificate. Please try again.",
    };
  }
}
