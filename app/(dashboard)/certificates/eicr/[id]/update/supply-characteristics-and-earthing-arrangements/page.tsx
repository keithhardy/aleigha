import { notFound } from "next/navigation";

import { UpdateSupplyCharacteristicsAndEarthingArrangementsForm } from "./form";

export default async function UpdateSupplyCharacteristicsAndEarthingArrangements({ params }: { params: Promise<{ id: string }> }) {
  const electricalInstallationConditionReport = await prisma.electricalInstallationConditionReport.findFirst({
    where: {
      id: (await params).id,
    },
    select: {
      id: true,
      systemTypeAndEarthingArrangements: true,
      supplyProtectiveDeviceBSNumber: true,
      supplyProtectiveDeviceType: true,
      supplyProtectiveDeviceRatedCurrent: true,
      numberAndTypeOfLiveConductors: true,
      confirmationOfSupplyPolarity: true,
      otherSourcesOfSupply: true,
      nominalVoltageBetweenLines: true,
      nominalLineVoltageToEarth: true,
      nominalFrequency: true,
      prospectiveFaultCurrent: true,
      externalEarthFaultLoopImpedance: true,
    },
  });

  if (!electricalInstallationConditionReport) {
    notFound();
  }

  return <UpdateSupplyCharacteristicsAndEarthingArrangementsForm electricalInstallationConditionReport={electricalInstallationConditionReport} />;
}
