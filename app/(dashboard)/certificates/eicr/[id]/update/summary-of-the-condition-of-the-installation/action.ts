"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { prisma } from "@/lib/db/prisma-client";
import { ServerActionResponse } from "@/types/server-action-response";

import { UpdateSummaryOfTheConditionOfTheInstallationSchema } from "./schema";

export async function updateSummaryOfTheConditionOfTheInstallation(
  electricalInstallationConditionReport: z.infer<typeof UpdateSummaryOfTheConditionOfTheInstallationSchema>,
): Promise<ServerActionResponse<void>> {
  try {
    await prisma.electricalInstallationConditionReport.update({
      where: {
        id: electricalInstallationConditionReport.id,
      },
      data: {
        generalCondition: electricalInstallationConditionReport.generalCondition,
        estimatedAgeOfElectricalInstallation:
          electricalInstallationConditionReport.estimatedAgeOfElectricalInstallation,
        evidenceOfAlterations: electricalInstallationConditionReport.evidenceOfAlterations,
        estimatedAgeOfAlterations: electricalInstallationConditionReport.estimatedAgeOfAlterations,
        overallAssessmentOfTheInstallation: electricalInstallationConditionReport.overallAssessmentOfTheInstallation,
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
