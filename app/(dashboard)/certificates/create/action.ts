"use server";

import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { customAlphabet } from "nanoid";
import { z } from "zod";

import { prisma } from "@/lib/prisma-client";
import { ServerActionResponse } from "@/types/server-action-response";

import { CreateCertificateSchema } from "./schema";

const MAX_RETRIES = 5;

export async function createCertificate(
  certificate: z.infer<typeof CreateCertificateSchema>,
): Promise<ServerActionResponse<void>> {
  let retries = 0;

  while (retries < MAX_RETRIES) {
    try {
      await prisma.electricalInstallationConditionReport.create({
        data: {
          serial: `EICR${customAlphabet("0123456789", 9)()}`,
          creatorId: certificate.creatorId,
          clientId: certificate.clientId,
          propertyId: certificate.propertyId,
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
