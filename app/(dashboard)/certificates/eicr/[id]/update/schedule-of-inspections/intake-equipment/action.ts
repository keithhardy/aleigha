"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { prisma } from "@/lib/prisma-client";
import { ServerActionResponse } from "@/types/server-action-response";

import { UpdateIntakeEquipmentSchema } from "./schema";

export async function updateIntakeEquipment(
  electricalInstallationConditionReport: z.infer<typeof UpdateIntakeEquipmentSchema>,
): Promise<ServerActionResponse<void>> {
  try {
    await prisma.electricalInstallationConditionReport.update({
      where: {
        id: electricalInstallationConditionReport.id,
      },
      data: {
        item_1_1A: electricalInstallationConditionReport.item_1_1A,
        item_1_1B: electricalInstallationConditionReport.item_1_1B,
        item_1_1C: electricalInstallationConditionReport.item_1_1C,
        item_1_1D: electricalInstallationConditionReport.item_1_1D,
        item_1_1E: electricalInstallationConditionReport.item_1_1E,
        item_1_1F: electricalInstallationConditionReport.item_1_1F,
        item_1_2: electricalInstallationConditionReport.item_1_2,
        item_1_3: electricalInstallationConditionReport.item_1_3,
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
