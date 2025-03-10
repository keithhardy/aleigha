"use server";

import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { ServerActionResponse } from "@/lib/types";

import { UpdateIsolationAndSwitchingSchema } from "./schema";

export async function updateIsolationAndSwitching(
  electricalInstallationConditionReport: z.infer<
    typeof UpdateIsolationAndSwitchingSchema
  >,
): Promise<ServerActionResponse<void>> {
  try {
    await prisma.electricalInstallationConditionReport.update({
      where: {
        id: electricalInstallationConditionReport.id,
      },
      data: {
        item_7_1A: electricalInstallationConditionReport.item_7_1A,
        item_7_1B: electricalInstallationConditionReport.item_7_1B,
        item_7_1C: electricalInstallationConditionReport.item_7_1C,
        item_7_1D: electricalInstallationConditionReport.item_7_1D,
        item_7_1E: electricalInstallationConditionReport.item_7_1E,
        item_7_1F: electricalInstallationConditionReport.item_7_1F,
        item_7_2A: electricalInstallationConditionReport.item_7_2A,
        item_7_2B: electricalInstallationConditionReport.item_7_2B,
        item_7_2C: electricalInstallationConditionReport.item_7_2C,
        item_7_2D: electricalInstallationConditionReport.item_7_2D,
        item_7_3A: electricalInstallationConditionReport.item_7_3A,
        item_7_3B: electricalInstallationConditionReport.item_7_3B,
        item_7_3C: electricalInstallationConditionReport.item_7_3C,
        item_7_3D: electricalInstallationConditionReport.item_7_3D,
        item_7_4A: electricalInstallationConditionReport.item_7_4A,
        item_7_4B: electricalInstallationConditionReport.item_7_4B,
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
