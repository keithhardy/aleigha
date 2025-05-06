"use server";

import { z } from "zod";

import { ServerActionResponse } from "@/next.types";
import { prisma } from "@/prisma/prisma";

import { DeleteElectricalInstallationConditionReportSchema } from "./schema";

export async function deleteElectricalInstallationConditionReport(
  electricalInstallationConditionReport: z.infer<
    typeof DeleteElectricalInstallationConditionReportSchema
  >,
): Promise<ServerActionResponse<void>> {
  try {
    await prisma.electricalInstallationConditionReport.delete({
      where: {
        id: electricalInstallationConditionReport.id,
      },
    });

    return {
      status: "success",
      heading: "Certificate Deleted Successfully",
      message: "The certificate has been deleted.",
    };
  } catch {
    return {
      status: "error",
      heading: "Certificate Deletion Failed",
      message: "There was an issue deleting the certificate. Please try again.",
    };
  }
}
