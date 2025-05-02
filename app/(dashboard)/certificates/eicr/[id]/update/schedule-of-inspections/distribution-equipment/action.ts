"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { prisma } from "@/lib/db/prisma-client";
import { ServerActionResponse } from "@/types/server-action-response";

import { UpdateDistributionEquipmentSchema } from "./schema";

export async function updateContractorClientAndInstallation(
  electricalInstallationConditionReport: z.infer<
    typeof UpdateDistributionEquipmentSchema
  >,
): Promise<ServerActionResponse<void>> {
  try {
    await prisma.electricalInstallationConditionReport.update({
      where: {
        id: electricalInstallationConditionReport.id,
      },
      data: {
        item_4_1: electricalInstallationConditionReport.item_4_1,
        item_4_2: electricalInstallationConditionReport.item_4_2,
        item_4_3: electricalInstallationConditionReport.item_4_3,
        item_4_4: electricalInstallationConditionReport.item_4_4,
        item_4_5: electricalInstallationConditionReport.item_4_5,
        item_4_6: electricalInstallationConditionReport.item_4_6,
        item_4_7: electricalInstallationConditionReport.item_4_7,
        item_4_8: electricalInstallationConditionReport.item_4_8,
        item_4_9: electricalInstallationConditionReport.item_4_9,
        item_4_10: electricalInstallationConditionReport.item_4_10,
        item_4_11: electricalInstallationConditionReport.item_4_11,
        item_4_12: electricalInstallationConditionReport.item_4_12,
        item_4_13: electricalInstallationConditionReport.item_4_13,
        item_4_14: electricalInstallationConditionReport.item_4_14,
        item_4_15: electricalInstallationConditionReport.item_4_15,
        item_4_16: electricalInstallationConditionReport.item_4_16,
        item_4_17: electricalInstallationConditionReport.item_4_17,
        item_4_18: electricalInstallationConditionReport.item_4_18,
        item_4_19: electricalInstallationConditionReport.item_4_19,
        item_4_20: electricalInstallationConditionReport.item_4_20,
        item_4_21: electricalInstallationConditionReport.item_4_21,
        item_4_22: electricalInstallationConditionReport.item_4_22,
        item_4_23: electricalInstallationConditionReport.item_4_23,
        item_4_24: electricalInstallationConditionReport.item_4_24,
        item_4_25: electricalInstallationConditionReport.item_4_25,
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
