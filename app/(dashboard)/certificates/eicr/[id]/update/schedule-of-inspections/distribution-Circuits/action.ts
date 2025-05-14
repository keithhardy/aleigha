"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { prisma } from "@/lib/db/prisma-client";
import { ServerActionResponse } from "@/next.types";

import { UpdateDistributionCircuitsSchema } from "./schema";

export async function updateDistributionCircuits(
  electricalInstallationConditionReport: z.infer<typeof UpdateDistributionCircuitsSchema>,
): Promise<ServerActionResponse<void>> {
  try {
    await prisma.electricalInstallationConditionReport.update({
      where: {
        id: electricalInstallationConditionReport.id,
      },
      data: {
        item_5_1: electricalInstallationConditionReport.item_5_1,
        item_5_2: electricalInstallationConditionReport.item_5_2,
        item_5_3: electricalInstallationConditionReport.item_5_3,
        item_5_4: electricalInstallationConditionReport.item_5_4,
        item_5_5: electricalInstallationConditionReport.item_5_5,
        item_5_6: electricalInstallationConditionReport.item_5_6,
        item_5_7: electricalInstallationConditionReport.item_5_7,
        item_5_8: electricalInstallationConditionReport.item_5_8,
        item_5_9: electricalInstallationConditionReport.item_5_9,
        item_5_10: electricalInstallationConditionReport.item_5_10,
        item_5_11: electricalInstallationConditionReport.item_5_11,
        item_5_12: electricalInstallationConditionReport.item_5_12,
        item_5_13: electricalInstallationConditionReport.item_5_13,
        item_5_14A: electricalInstallationConditionReport.item_5_14A,
        item_5_14B: electricalInstallationConditionReport.item_5_14B,
        item_5_15: electricalInstallationConditionReport.item_5_15,
        item_5_16: electricalInstallationConditionReport.item_5_16,
        item_5_17: electricalInstallationConditionReport.item_5_17,
        item_5_18: electricalInstallationConditionReport.item_5_18,
        item_5_19: electricalInstallationConditionReport.item_5_19,
        item_5_20: electricalInstallationConditionReport.item_5_20,
        item_5_21: electricalInstallationConditionReport.item_5_21,
        item_5_22: electricalInstallationConditionReport.item_5_22,
        item_5_23: electricalInstallationConditionReport.item_5_23,
        item_5_24: electricalInstallationConditionReport.item_5_24,
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
