import { ElectricalInstallationConditionReport } from "@prisma/client";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma-client";

import { UpdateDetailsAndLimitationsOfTheInspectionAndTestingForm } from "./form";

export default async function UpdateDetailsAndLimitationsOfTheInspectionAndTesting({
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
        regulationAccordanceAsAmendedTo: true,
        detailsOfTheElectricalInstallation: true,
        extentOfSampling: true,
        agreedLimitations: true,
        agreedLimitationsWith: true,
        operationalLimitations: true,
      },
    });

  if (!certificate) {
    notFound();
  }

  return (
    <UpdateDetailsAndLimitationsOfTheInspectionAndTestingForm
      certificate={certificate as ElectricalInstallationConditionReport}
    />
  );
}
