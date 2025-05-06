import { ElectricalInstallationConditionReport } from "@prisma/client";
import { notFound } from "next/navigation";

import { prisma } from "@/prisma/prisma";

import { UpdateSummaryOfTheConditionOfTheInstallationForm } from "./form";

export default async function UpdateSummaryOfTheConditionOfTheInstallation({
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
        generalCondition: true,
        estimatedAgeOfElectricalInstallation: true,
        evidenceOfAlterations: true,
        estimatedAgeOfAlterations: true,
        overallAssessmentOfTheInstallation: true,
      },
    });

  if (!certificate) {
    notFound();
  }

  return (
    <UpdateSummaryOfTheConditionOfTheInstallationForm
      certificate={certificate as ElectricalInstallationConditionReport}
    />
  );
}
