import { ElectricalInstallationConditionReport } from "@prisma/client";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";

import { UpdateScheduleOfCircuitDetailsAndTestResultsForm } from "./form";

export default async function UpdateScheduleOfCircuitDetailsAndTestResults({
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
        db: true,
      },
    });

  if (!electricalInstallationConditionReport) {
    notFound();
  }

  return (
    <UpdateScheduleOfCircuitDetailsAndTestResultsForm
      electricalInstallationConditionReport={
        electricalInstallationConditionReport as ElectricalInstallationConditionReport
      }
    />
  );
}
