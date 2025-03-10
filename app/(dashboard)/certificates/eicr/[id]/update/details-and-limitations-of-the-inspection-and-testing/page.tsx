import { notFound } from "next/navigation";

import { UpdateDetailsAndLimitationsOfTheInspectionAndTestingForm } from "./form";

export default async function UpdateDetailsAndLimitationsOfTheInspectionAndTesting({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const electricalInstallationConditionReport =
    await prisma.electricalInstallationConditionReport.findFirst({
      where: {
        id: (await params).id,
      },
      select: {
        id: true,
        regulationAccordanceAsAmendedTo: true,
        detailsOfTheElectricalInstallation: true,
        extentOfSampling: true,
        agreedLimitations: true,
        agreedLimitationsWith: true,
        operationalLimitations: true,
      },
    });

  if (!electricalInstallationConditionReport) {
    notFound();
  }

  return (
    <UpdateDetailsAndLimitationsOfTheInspectionAndTestingForm
      electricalInstallationConditionReport={
        electricalInstallationConditionReport
      }
    />
  );
}
