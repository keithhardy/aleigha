"use server";

import { ElectricalInstallationConditionReport } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { Schema } from "./schema";
import { ServerActionResponse } from "@/lib/types";

export async function createEicr(
  eicr: z.infer<typeof Schema>
): Promise<ServerActionResponse<ElectricalInstallationConditionReport>> {
  try {
    const createdEICR =
      await prisma.electricalInstallationConditionReport.create({
        data: {
          userId: eicr.userId,
          clientId: eicr.clientId,
          propertyId: eicr.propertyId,
        },
      });

    return {
      status: "success",
      heading: "EICR Created Successfully",
      message: "The new EICR has been created.",
    };
  } catch (error) {
    return {
      status: "error",
      heading: "EICR Creation Failed",
      message: "There was an issue creating the EICR. Please try again.",
    };
  }
}
