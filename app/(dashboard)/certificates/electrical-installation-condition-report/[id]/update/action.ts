"use server";

import { ElectricalInstallationConditionReport } from "@prisma/client";
import { customAlphabet } from "nanoid";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { ServerActionResponse } from "@/lib/types";

import { Schema } from "./schema";

const MAX_RETRIES = 5;

export async function createElectricalInstallationConditionReport(
  electricalInstallationConditionReport: z.infer<typeof Schema>
): Promise<ServerActionResponse<ElectricalInstallationConditionReport>> {
  let retries = 0;

  while (retries < MAX_RETRIES) {
    try {
      await prisma.electricalInstallationConditionReport.create({
        data: {
          serial: `EICR${customAlphabet("0123456789", 9)()}`,
          creatorId: electricalInstallationConditionReport.creatorId,
          clientId: electricalInstallationConditionReport.clientId,
          propertyId: electricalInstallationConditionReport.propertyId,
        },
      });

      return {
        status: "success",
        heading:
          "Electrical Installation Condition Report Created Successfully",
        message:
          "The new Electrical Installation Condition Report has been created.",
      };
    } catch (error: any) {
      if (error.code === "P2002" && error.meta?.target?.includes("serial")) {
        retries++;
      } else {
        return {
          status: "error",
          heading: "Electrical Installation Condition Report Creation Failed",
          message:
            "There was an issue creating the Electrical Installation Condition Report. Please try again.",
        };
      }
    }
  }

  return {
    status: "error",
    heading: "Electrical Installation Condition Report Creation Failed",
    message:
      "There was an issue creating the Electrical Installation Condition Report. Please try again.",
  };
}
