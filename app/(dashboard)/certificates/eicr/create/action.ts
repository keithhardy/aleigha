"use server";

import { ElectricalInstallationConditionReport } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { customAlphabet } from "nanoid";
import { z } from "zod";

import { prisma } from "@/lib/prisma-client";
import { ServerActionResponse } from "@/lib/types/server-action-response";

import { CreateElectricalInstallationConditionReportSchema } from "./schema";

const MAX_RETRIES = 5;

export async function createElectricalInstallationConditionReport(
  electricalInstallationConditionReport: z.infer<
    typeof CreateElectricalInstallationConditionReportSchema
  >,
): Promise<ServerActionResponse<ElectricalInstallationConditionReport>> {
  let retries = 0;

  while (retries < MAX_RETRIES) {
    try {
      await prisma.electricalInstallationConditionReport.create({
        data: {
          type: "Electrical Installation Condition Report",
          serial: `EICR${customAlphabet("0123456789", 9)()}`,
          creatorId: electricalInstallationConditionReport.creatorId,
          clientId: electricalInstallationConditionReport.clientId,
          propertyId: electricalInstallationConditionReport.propertyId,
        },
      });

      return {
        status: "success",
        heading: "Certificate Created Successfully",
        message: "The new certificate has been created.",
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        const meta = error.meta as { target: string | string[] };
        if (error.code === "P2002" && meta?.target?.includes("serial")) {
          retries++;
        } else {
          return {
            status: "error",
            heading: "Certificate Creation Failed",
            message:
              "There was an issue creating the certificate. Please try again.",
          };
        }
      } else {
        return {
          status: "error",
          heading: "Unexpected Error",
          message: "An unexpected error occurred. Please try again later.",
        };
      }
    }
  }

  return {
    status: "error",
    heading: "Certificate Creation Failed",
    message: "There was an issue creating the certificate. Please try again.",
  };
}
