"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { prisma } from "@/lib/db/prisma-client";
import { ServerActionResponse } from "@/next.types";

import { UpdateDeclarationSchema } from "./schema";

export async function updateDeclaration(
  electricalInstallationConditionReport: z.infer<typeof UpdateDeclarationSchema>,
): Promise<ServerActionResponse<void>> {
  try {
    await prisma.electricalInstallationConditionReport.update({
      where: {
        id: electricalInstallationConditionReport.id,
      },
      data: {
        recommendedRetestDate: electricalInstallationConditionReport.recommendedRetestDate,
        reasonForRecommendation: electricalInstallationConditionReport.reasonForRecommendation,
        inspectorId: electricalInstallationConditionReport.inspectorId,
        inspectionDate: electricalInstallationConditionReport.inspectionDate,
        reviewerId: electricalInstallationConditionReport.reviewerId,
        reviewDate: electricalInstallationConditionReport.reviewDate,
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
