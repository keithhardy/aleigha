import { ElectricalInstallationConditionReport } from "@prisma/client";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/db/prisma-client";

import { UpdateParticularsOfInstallationsReferredToInThisReportForm } from "./form";

export default async function UpdateParticularsOfInstallationsReferredToInThisReport({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const certificate =
    await prisma.electricalInstallationConditionReport.findFirst({
      where: {
        id: (await params).id,
      },
      select: {
        id: true,
        maximumDemand: true,
        distributorsFacility: true,
        installationEarthElectrodes: true,
        earthElectrodeType: true,
        earthElectrodeLocation: true,
        electrodeResistanceToEarth: true,
        earthingConductorMaterial: true,
        earthingConductorCSA: true,
        earthingConductorVerified: true,
        mainProtectiveBondingConductorMaterial: true,
        mainProtectiveBondingConductorCSA: true,
        mainProtectiveBondingConductorVerified: true,
        waterInstallationPipes: true,
        gasInstallationPipes: true,
        structuralSteel: true,
        oilInstallationPipes: true,
        lightningProtection: true,
        other: true,
        mainSwitchLocation: true,
        mainSwitchBSNumber: true,
        mainSwitchType: true,
        mainSwitchRating: true,
        mainSwitchPoles: true,
        mainSwitchCurrentRating: true,
        mainSwitchVoltageRating: true,
        mainSwitchRCDOperatingCurrent: true,
        mainSwitchRCDType: true,
        mainSwitchRCDRatedTimeDelay: true,
        mainSwitchRCDMeasuredOperatingTime: true,
      },
    });

  if (!certificate) {
    notFound();
  }

  return (
    <UpdateParticularsOfInstallationsReferredToInThisReportForm
      certificate={certificate as ElectricalInstallationConditionReport}
    />
  );
}
