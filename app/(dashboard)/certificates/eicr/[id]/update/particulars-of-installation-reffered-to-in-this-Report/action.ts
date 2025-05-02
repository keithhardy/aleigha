"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { prisma } from "@/lib/db/prisma-client";
import { ServerActionResponse } from "@/types/server-action-response";

import { UpdateParticularsOfInstallationsReferredToInThisReportSchema } from "./schema";

export async function updateParticularsOfInstallationsReferredToInThisReport(
  electricalInstallationConditionReport: z.infer<
    typeof UpdateParticularsOfInstallationsReferredToInThisReportSchema
  >,
): Promise<ServerActionResponse<void>> {
  try {
    await prisma.electricalInstallationConditionReport.update({
      where: {
        id: electricalInstallationConditionReport.id,
      },
      data: {
        maximumDemand: electricalInstallationConditionReport.maximumDemand,
        distributorsFacility:
          electricalInstallationConditionReport.distributorsFacility,
        installationEarthElectrodes:
          electricalInstallationConditionReport.installationEarthElectrodes,
        earthElectrodeType:
          electricalInstallationConditionReport.earthElectrodeType,
        earthElectrodeLocation:
          electricalInstallationConditionReport.earthElectrodeLocation,
        electrodeResistanceToEarth:
          electricalInstallationConditionReport.electrodeResistanceToEarth,
        earthingConductorMaterial:
          electricalInstallationConditionReport.earthingConductorMaterial,
        earthingConductorCSA:
          electricalInstallationConditionReport.earthingConductorCSA,
        earthingConductorVerified:
          electricalInstallationConditionReport.earthingConductorVerified,
        mainProtectiveBondingConductorMaterial:
          electricalInstallationConditionReport.mainProtectiveBondingConductorMaterial,
        mainProtectiveBondingConductorCSA:
          electricalInstallationConditionReport.mainProtectiveBondingConductorCSA,
        mainProtectiveBondingConductorVerified:
          electricalInstallationConditionReport.mainProtectiveBondingConductorVerified,
        waterInstallationPipes:
          electricalInstallationConditionReport.waterInstallationPipes,
        gasInstallationPipes:
          electricalInstallationConditionReport.gasInstallationPipes,
        structuralSteel: electricalInstallationConditionReport.structuralSteel,
        oilInstallationPipes:
          electricalInstallationConditionReport.oilInstallationPipes,
        lightningProtection:
          electricalInstallationConditionReport.lightningProtection,
        other: electricalInstallationConditionReport.other,
        mainSwitchLocation:
          electricalInstallationConditionReport.mainSwitchLocation,
        mainSwitchBSNumber:
          electricalInstallationConditionReport.mainSwitchBSNumber,
        mainSwitchType: electricalInstallationConditionReport.mainSwitchType,
        mainSwitchRating:
          electricalInstallationConditionReport.mainSwitchRating,
        mainSwitchPoles: electricalInstallationConditionReport.mainSwitchPoles,
        mainSwitchCurrentRating:
          electricalInstallationConditionReport.mainSwitchCurrentRating,
        mainSwitchVoltageRating:
          electricalInstallationConditionReport.mainSwitchVoltageRating,
        mainSwitchRCDOperatingCurrent:
          electricalInstallationConditionReport.mainSwitchRCDOperatingCurrent,
        mainSwitchRCDType:
          electricalInstallationConditionReport.mainSwitchRCDType,
        mainSwitchRCDRatedTimeDelay:
          electricalInstallationConditionReport.mainSwitchRCDRatedTimeDelay,
        mainSwitchRCDMeasuredOperatingTime:
          electricalInstallationConditionReport.mainSwitchRCDMeasuredOperatingTime,
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
