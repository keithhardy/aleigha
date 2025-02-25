"use server";

import { ElectricalInstallationConditionReport } from "@prisma/client";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { ServerActionResponse } from "@/lib/types";

import { Schema } from "./schema";

export async function updateElectricalInstallationConditionReport(
  electricalInstallationConditionReport: z.infer<typeof Schema>
): Promise<ServerActionResponse<ElectricalInstallationConditionReport>> {
  try {
    await prisma.electricalInstallationConditionReport.update({
      where: {
        id: electricalInstallationConditionReport.id,
      },
      data: {
        clientId: electricalInstallationConditionReport.clientId,
        propertyId: electricalInstallationConditionReport.propertyId,
        startDate: electricalInstallationConditionReport.startDate,
        endDate: electricalInstallationConditionReport.endDate,
      },
    });

    return {
      status: "success",
      heading: "Certificate Updated Successfully",
      message: "The certificate has been updated.",
    };
  } catch {
    return {
      status: "error",
      heading: "Certificate Update Failed",
      message: "There was an issue updating the certificate. Please try again.",
    };
  }
}
