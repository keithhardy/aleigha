"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { Schema } from "./schema";

export async function deleteElectricalInstallationConditionReport(
  electricalInstallationConditionReport: z.infer<typeof Schema>
): Promise<void> {
  try {
    await prisma.electricalInstallationConditionReport.delete({
      where: {
        id: electricalInstallationConditionReport.id,
      },
    });

    revalidatePath("/certificates");
  } catch {
    throw new Error("Electrical Installation Condition Report deletion failed");
  }
}
