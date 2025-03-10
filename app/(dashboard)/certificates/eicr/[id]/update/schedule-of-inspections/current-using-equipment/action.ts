"use server";

import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { ServerActionResponse } from "@/lib/types";

import { UpdateCurrentUsingEquipmentSchema } from "./schema";

export async function updateCurrentUsingEquipment(
  electricalInstallationConditionReport: z.infer<
    typeof UpdateCurrentUsingEquipmentSchema
  >,
): Promise<ServerActionResponse<void>> {
  try {
    await prisma.electricalInstallationConditionReport.update({
      where: {
        id: electricalInstallationConditionReport.id,
      },
      data: {
        item_8_1: electricalInstallationConditionReport.item_8_1,
        item_8_2: electricalInstallationConditionReport.item_8_2,
        item_8_3: electricalInstallationConditionReport.item_8_3,
        item_8_4: electricalInstallationConditionReport.item_8_4,
        item_8_5: electricalInstallationConditionReport.item_8_5,
        item_8_6: electricalInstallationConditionReport.item_8_6,
        item_8_7A: electricalInstallationConditionReport.item_8_7A,
        item_8_7B: electricalInstallationConditionReport.item_8_7B,
        item_8_7C: electricalInstallationConditionReport.item_8_7C,
        item_8_7D: electricalInstallationConditionReport.item_8_7D,
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
