"use server";

import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { ServerActionResponse } from "@/lib/types";

import { UpdateScheduleOfCircuitDetailsAndTestResultsSchema } from "./schema";

export async function updateScheduleOfCircuitDetailsAndTestResults(electricalInstallationConditionReport: z.infer<typeof UpdateScheduleOfCircuitDetailsAndTestResultsSchema>): Promise<ServerActionResponse<void>> {
  try {
    await prisma.electricalInstallationConditionReport.update({
      where: {
        id: electricalInstallationConditionReport.id,
      },
      data: {
        db: electricalInstallationConditionReport.db,
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
