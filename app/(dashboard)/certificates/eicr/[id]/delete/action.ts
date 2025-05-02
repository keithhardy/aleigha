"use server";

import { z } from "zod";

import { prisma } from "@/lib/prisma-client";
import { ServerActionResponse } from "@/types/server-action-response";

import { DeleteElectricalInstallationConditionReportSchema } from "./schema";

export async function deleteElectricalInstallationConditionReport(
  electricalInstallationConditionReport: z.infer<typeof DeleteElectricalInstallationConditionReportSchema>,
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
