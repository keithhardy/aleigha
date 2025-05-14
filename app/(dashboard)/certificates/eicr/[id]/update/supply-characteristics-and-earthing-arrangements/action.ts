"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { prisma } from "@/lib/db/prisma-client";
import { ServerActionResponse } from "@/next.types";

import { UpdateSupplyCharacteristicsAndEarthingArrangementsSchema } from "./schema";

export async function updateSupplyCharacteristicsAndEarthingArrangements(
  electricalInstallationConditionReport: z.infer<
    typeof UpdateSupplyCharacteristicsAndEarthingArrangementsSchema
  >,
): Promise<ServerActionResponse<void>> {
  try {
    await prisma.electricalInstallationConditionReport.update({
      where: {
        id: electricalInstallationConditionReport.id,
      },
      data: {
        systemTypeAndEarthingArrangements:
          electricalInstallationConditionReport.systemTypeAndEarthingArrangements,
        supplyProtectiveDeviceBSNumber:
          electricalInstallationConditionReport.supplyProtectiveDeviceBSNumber,
        supplyProtectiveDeviceType:
          electricalInstallationConditionReport.supplyProtectiveDeviceType,
        supplyProtectiveDeviceRatedCurrent:
          electricalInstallationConditionReport.supplyProtectiveDeviceRatedCurrent,
        numberAndTypeOfLiveConductors:
          electricalInstallationConditionReport.numberAndTypeOfLiveConductors,
        confirmationOfSupplyPolarity:
          electricalInstallationConditionReport.confirmationOfSupplyPolarity,
        otherSourcesOfSupply: electricalInstallationConditionReport.otherSourcesOfSupply,
        nominalVoltageBetweenLines:
          electricalInstallationConditionReport.nominalVoltageBetweenLines,
        nominalLineVoltageToEarth: electricalInstallationConditionReport.nominalLineVoltageToEarth,
        nominalFrequency: electricalInstallationConditionReport.nominalFrequency,
        prospectiveFaultCurrent: electricalInstallationConditionReport.prospectiveFaultCurrent,
        externalEarthFaultLoopImpedance:
          electricalInstallationConditionReport.externalEarthFaultLoopImpedance,
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
