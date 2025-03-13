"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { ServerActionResponse } from "@/lib/types";

import { UpdatePurposeOfTheReportSchema } from "./schema";

export async function updatePurposeOfTheReport(
  electricalInstallationConditionReport: z.infer<
    typeof UpdatePurposeOfTheReportSchema
  >,
): Promise<ServerActionResponse<void>> {
  try {
    await prisma.electricalInstallationConditionReport.update({
      where: {
        id: electricalInstallationConditionReport.id,
      },
      data: {
        purpose: electricalInstallationConditionReport.purpose,
        startDate: electricalInstallationConditionReport.startDate,
        endDate: electricalInstallationConditionReport.endDate,
        recordsAvailable:
          electricalInstallationConditionReport.recordsAvailable,
        previousReportAvailable:
          electricalInstallationConditionReport.previousReportAvailable,
        previousReportDate:
          electricalInstallationConditionReport.previousReportDate,
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
