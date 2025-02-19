"use server";

import { ElectricalInstallationConditionReport } from "@prisma/client";
import { customAlphabet } from "nanoid";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { ServerActionResponse } from "@/lib/types";

import { Schema } from "./schema";

const MAX_RETRIES = 5;

export async function createEicr(
  eicr: z.infer<typeof Schema>
): Promise<ServerActionResponse<ElectricalInstallationConditionReport>> {
  let retries = 0;

  while (retries < MAX_RETRIES) {
    try {
      await prisma.electricalInstallationConditionReport.create({
        data: {
          serial: `EICR${customAlphabet("0123456789", 9)()}`,
          creatorId: eicr.creatorId,
          clientId: eicr.clientId,
          propertyId: eicr.propertyId,
        },
      });

      return {
        status: "success",
        heading: "EICR Created Successfully",
        message: "The new EICR has been created.",
      };
    } catch (error: any) {
      if (error.code === "P2002" && error.meta?.target?.includes("serial")) {
        retries++;
      } else {
        return {
          status: "error",
          heading: "EICR Creation Failed",
          message: "There was an issue creating the EICR. Please try again.",
        };
      }
    }
  }

  return {
    status: "error",
    heading: "EICR Creation Failed",
    message: "There was an issue creating the EICR. Please try again.",
  };
}
