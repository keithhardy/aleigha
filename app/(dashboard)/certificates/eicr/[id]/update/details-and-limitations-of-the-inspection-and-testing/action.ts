"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { ServerActionResponse } from "@/next.types";
import { prisma } from "@/prisma/prisma";

import { UpdateDetailsAndLimitationsOfTheInspectionAndTestingSchema } from "./schema";

export async function updateDetailsAndLimitationsOfTheInspectionAndTesting(
  electricalInstallationConditionReport: z.infer<
    typeof UpdateDetailsAndLimitationsOfTheInspectionAndTestingSchema
  >,
): Promise<ServerActionResponse<void>> {
  try {
    await prisma.electricalInstallationConditionReport.update({
      where: {
        id: electricalInstallationConditionReport.id,
      },
      data: {
        regulationAccordanceAsAmendedTo:
          electricalInstallationConditionReport.regulationAccordanceAsAmendedTo,
        detailsOfTheElectricalInstallation:
          electricalInstallationConditionReport.detailsOfTheElectricalInstallation,
        extentOfSampling:
          electricalInstallationConditionReport.extentOfSampling,
        agreedLimitations:
          electricalInstallationConditionReport.agreedLimitations,
        agreedLimitationsWith:
          electricalInstallationConditionReport.agreedLimitationsWith,
        operationalLimitations:
          electricalInstallationConditionReport.operationalLimitations,
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
