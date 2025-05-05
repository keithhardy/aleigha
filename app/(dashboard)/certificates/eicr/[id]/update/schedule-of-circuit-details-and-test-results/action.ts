"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { prisma } from "@/prisma";
import { ServerActionResponse } from "@/types/server-action-response";

import { UpdateScheduleOfCircuitDetailsAndTestResultsSchema } from "./schema";

export async function updateScheduleOfCircuitDetailsAndTestResults(
  electricalInstallationConditionReport: z.infer<
    typeof UpdateScheduleOfCircuitDetailsAndTestResultsSchema
  >,
): Promise<ServerActionResponse<void>> {
  try {
    await prisma.electricalInstallationConditionReport.update({
      where: {
        id: electricalInstallationConditionReport.id,
      },
      data: {
        consumerUnits: JSON.stringify(
          electricalInstallationConditionReport.consumerUnits,
        ),
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
