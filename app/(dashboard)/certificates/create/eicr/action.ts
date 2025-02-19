"use server";

import { ElectricalInstallationConditionReport } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { schema } from "./schema";

export async function createEicr(
  eicr: z.infer<typeof schema>
): Promise<ElectricalInstallationConditionReport> {
  try {
    const createdEICR =
      await prisma.electricalInstallationConditionReport.create({
        data: {
          userId: eicr.userId,
          clientId: eicr.clientId,
          propertyId: eicr.propertyId,
        },
      });

    revalidatePath("/certificates");
    return createdEICR;
  } catch (e) {
    console.log(e);
    throw new Error("EICR creation failed");
  }
}
