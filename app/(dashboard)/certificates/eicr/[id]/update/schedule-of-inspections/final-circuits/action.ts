"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { prisma } from "@/lib/prisma-client";
import { ServerActionResponse } from "@/types/server-action-response";

import { UpdateFinalCircuitsSchema } from "./schema";

export async function updateFinalCircuits(
  electricalInstallationConditionReport: z.infer<
    typeof UpdateFinalCircuitsSchema
  >,
): Promise<ServerActionResponse<void>> {
  try {
    await prisma.electricalInstallationConditionReport.update({
      where: {
        id: electricalInstallationConditionReport.id,
      },
      data: {
        item_6_1: electricalInstallationConditionReport.item_6_1,
        item_6_2: electricalInstallationConditionReport.item_6_2,
        item_6_3: electricalInstallationConditionReport.item_6_3,
        item_6_4: electricalInstallationConditionReport.item_6_4,
        item_6_5: electricalInstallationConditionReport.item_6_5,
        item_6_6: electricalInstallationConditionReport.item_6_6,
        item_6_7: electricalInstallationConditionReport.item_6_7,
        item_6_8: electricalInstallationConditionReport.item_6_8,
        item_6_9: electricalInstallationConditionReport.item_6_9,
        item_6_10: electricalInstallationConditionReport.item_6_10,
        item_6_11: electricalInstallationConditionReport.item_6_11,
        item_6_12A: electricalInstallationConditionReport.item_6_12A,
        item_6_12B: electricalInstallationConditionReport.item_6_12B,
        item_6_13A: electricalInstallationConditionReport.item_6_13A,
        item_6_13B: electricalInstallationConditionReport.item_6_13B,
        item_6_13C: electricalInstallationConditionReport.item_6_13C,
        item_6_13D: electricalInstallationConditionReport.item_6_13D,
        item_6_13E: electricalInstallationConditionReport.item_6_13E,
        item_6_14: electricalInstallationConditionReport.item_6_14,
        item_6_15: electricalInstallationConditionReport.item_6_15,
        item_6_16: electricalInstallationConditionReport.item_6_16,
        item_6_17A: electricalInstallationConditionReport.item_6_17A,
        item_6_17B: electricalInstallationConditionReport.item_6_17B,
        item_6_17C: electricalInstallationConditionReport.item_6_17C,
        item_6_17D: electricalInstallationConditionReport.item_6_17D,
        item_6_18: electricalInstallationConditionReport.item_6_18,
        item_6_19: electricalInstallationConditionReport.item_6_19,
        item_6_20: electricalInstallationConditionReport.item_6_20,
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
