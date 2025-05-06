"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { ServerActionResponse } from "@/next.types";
import { prisma } from "@/prisma";

import { UpdateObservationsSchema } from "./schema";

export async function updateObservations(
  electricalInstallationConditionReport: z.infer<
    typeof UpdateObservationsSchema
  >,
): Promise<ServerActionResponse<void>> {
  try {
    await prisma.electricalInstallationConditionReport.update({
      where: {
        id: electricalInstallationConditionReport.id,
      },
      data: {
        observations: JSON.stringify(
          electricalInstallationConditionReport.observations,
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
