"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { prisma } from "@/lib/prisma-client";
import { ServerActionResponse } from "@/lib/types/server-action-response";

import { UpdateScheduleOfRatesSchema } from "./schema";

export async function updateScheduleOfRates(
  electricalInstallationConditionReport: z.infer<
    typeof UpdateScheduleOfRatesSchema
  >,
): Promise<ServerActionResponse<void>> {
  try {
    await prisma.electricalInstallationConditionReport.update({
      where: {
        id: electricalInstallationConditionReport.id,
      },
      data: {
        rates: JSON.stringify(electricalInstallationConditionReport.rates),
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
