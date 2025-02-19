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
      },
    });

    return {
      status: "success",
      heading: "Electrical Installation Condition Report Updated Successfully",
      message:
        "The new Electrical Installation Condition Report has been updated.",
    };
  } catch {
    return {
      status: "error",
      heading: "Electrical Installation Condition Report Update Failed",
      message:
        "There was an issue updating the Electrical Installation Condition Report. Please try again.",
    };
  }
}
