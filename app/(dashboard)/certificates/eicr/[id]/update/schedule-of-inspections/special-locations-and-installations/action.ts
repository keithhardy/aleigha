"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { ServerActionResponse } from "@/lib/types";

import { UpdateSpecialLocationsAndInstallationsSchema } from "./schema";

export async function updateContractorClientAndInstallation(electricalInstallationConditionReport: z.infer<typeof UpdateSpecialLocationsAndInstallationsSchema>): Promise<ServerActionResponse<void>> {
  try {
    await prisma.electricalInstallationConditionReport.update({
      where: {
        id: electricalInstallationConditionReport.id,
      },
      data: {
        item_9_1A: electricalInstallationConditionReport.item_9_1A,
        item_9_1B: electricalInstallationConditionReport.item_9_1B,
        item_9_1C: electricalInstallationConditionReport.item_9_1C,
        item_9_1D: electricalInstallationConditionReport.item_9_1D,
        item_9_1E: electricalInstallationConditionReport.item_9_1E,
        item_9_1F: electricalInstallationConditionReport.item_9_1F,
        item_9_1G: electricalInstallationConditionReport.item_9_1G,
        item_9_1H: electricalInstallationConditionReport.item_9_1H,
        item_9_2: electricalInstallationConditionReport.item_9_2,
      },
    });

    revalidatePath("/certificates");

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
