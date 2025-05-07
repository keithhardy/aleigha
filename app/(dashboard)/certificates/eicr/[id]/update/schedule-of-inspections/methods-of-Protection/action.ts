"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { ServerActionResponse } from "@/next.types";
import { prisma } from "@/src/lib/db/prisma-client";

import { UpdateMethodsOfProtectionSchema } from "./schema";

export async function updateMethodsOfProtection(
  electricalInstallationConditionReport: z.infer<
    typeof UpdateMethodsOfProtectionSchema
  >,
): Promise<ServerActionResponse<void>> {
  try {
    await prisma.electricalInstallationConditionReport.update({
      where: {
        id: electricalInstallationConditionReport.id,
      },
      data: {
        item_3_1A: electricalInstallationConditionReport.item_3_1A,
        item_3_1B: electricalInstallationConditionReport.item_3_1B,
        item_3_1C: electricalInstallationConditionReport.item_3_1C,
        item_3_1D: electricalInstallationConditionReport.item_3_1D,
        item_3_1E: electricalInstallationConditionReport.item_3_1E,
        item_3_1F: electricalInstallationConditionReport.item_3_1F,
        item_3_1G: electricalInstallationConditionReport.item_3_1G,
        item_3_1H: electricalInstallationConditionReport.item_3_1H,
        item_3_1I: electricalInstallationConditionReport.item_3_1I,
        item_3_2: electricalInstallationConditionReport.item_3_2,
        item_3_3A: electricalInstallationConditionReport.item_3_3A,
        item_3_3B: electricalInstallationConditionReport.item_3_3B,
        item_3_3C: electricalInstallationConditionReport.item_3_3C,
        item_3_3D: electricalInstallationConditionReport.item_3_3D,
        item_3_3E: electricalInstallationConditionReport.item_3_3E,
        item_3_3F: electricalInstallationConditionReport.item_3_3F,
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
